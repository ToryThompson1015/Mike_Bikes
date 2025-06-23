const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const { sendBookingConfirmation, sendAdminNotification } = require('../utils/emailService');

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const { status, date, serviceType } = req.query;
    let filter = {};
    
    if (status) filter.status = status;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.date = { $gte: startDate, $lt: endDate };
    }
    if (serviceType) filter.serviceType = serviceType;
    
    const bookings = await Booking.find(filter).sort({ date: 1, time: 1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Check available time slots
router.get('/available-slots', async (req, res) => {
  try {
    const { date, duration = 60 } = req.query;
    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    const selectedDate = new Date(date);
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Get existing bookings for the date
    const existingBookings = await Booking.find({
      date: { $gte: startOfDay, $lte: endOfDay },
      status: { $nin: ['cancelled'] }
    });

    // Define business hours (9 AM to 6 PM)
    const businessHours = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 17 && minute > 0) break; // Stop at 6 PM
        businessHours.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
      }
    }

    // Filter out booked slots
    const bookedSlots = existingBookings.map(booking => booking.time);
    const availableSlots = businessHours.filter(slot => !bookedSlots.includes(slot));

    res.json({ availableSlots, bookedSlots });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new booking
router.post('/', [
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().trim().withMessage('Phone number is required'),
  body('serviceType').isIn(['motorcycle-lesson', 'transportation-pickup']).withMessage('Valid service type is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid time format is required (HH:MM)'),
  body('duration').optional().isInt({ min: 30, max: 120 }).withMessage('Duration must be between 30 and 120 minutes'),
  body('location.address').notEmpty().trim().withMessage('Address is required'),
  body('lessonType').optional().isIn(['beginner', 'intermediate', 'advanced']).withMessage('Valid lesson type is required'),
  body('pickupDetails.from').optional().notEmpty().trim().withMessage('Pickup location is required for transportation'),
  body('pickupDetails.to').optional().notEmpty().trim().withMessage('Destination is required for transportation')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if time slot is available
    const selectedDate = new Date(req.body.date);
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const conflictingBooking = await Booking.findOne({
      date: { $gte: startOfDay, $lte: endOfDay },
      time: req.body.time,
      status: { $nin: ['cancelled'] }
    });

    if (conflictingBooking) {
      return res.status(400).json({ 
        message: 'This time slot is already booked. Please select a different time.' 
      });
    }

    // Validate business hours
    const hour = parseInt(req.body.time.split(':')[0]);
    if (hour < 9 || hour >= 18) {
      return res.status(400).json({ 
        message: 'Bookings are only available between 9 AM and 6 PM' 
      });
    }

    const booking = new Booking(req.body);
    const newBooking = await booking.save();

    // Send email notifications
    try {
      await sendBookingConfirmation(newBooking);
      await sendAdminNotification(newBooking);
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the booking if email fails
    }

    res.status(201).json({
      message: 'Booking created successfully',
      booking: newBooking,
      confirmationCode: newBooking.confirmationCode
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get booking by confirmation code
router.get('/confirm/:code', async (req, res) => {
  try {
    const booking = await Booking.findOne({ confirmationCode: req.params.code });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update booking status
router.patch('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    const allowedUpdates = ['status', 'notes', 'instructor', 'paymentStatus'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    
    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }
    
    updates.forEach(update => booking[update] = req.body[update]);
    const updatedBooking = await booking.save();
    
    res.json(updatedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cancel booking
router.patch('/:id/cancel', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }
    
    booking.status = 'cancelled';
    const updatedBooking = await booking.save();
    
    res.json({ message: 'Booking cancelled successfully', booking: updatedBooking });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete booking (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    await booking.deleteOne();
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 