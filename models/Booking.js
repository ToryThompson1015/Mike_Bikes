const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['motorcycle-lesson', 'transportation-pickup']
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 60, // minutes
    enum: [30, 60, 90, 120]
  },
  location: {
    address: {
      type: String,
      required: true
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  lessonType: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: function() { return this.serviceType === 'motorcycle-lesson'; }
  },
  pickupDetails: {
    from: String,
    to: String,
    vehicleType: String
  },
  specialRequests: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  confirmationCode: {
    type: String,
    unique: true,
    sparse: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  price: {
    type: Number,
    required: true
  },
  instructor: {
    type: String,
    default: 'Mike'
  },
  notes: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate confirmation code before saving
bookingSchema.pre('save', function(next) {
  if (!this.confirmationCode) {
    this.confirmationCode = 'MB' + Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 3).toUpperCase();
  }
  this.updatedAt = Date.now();
  next();
});

// Calculate price based on service type and duration
bookingSchema.pre('save', function(next) {
  if (!this.price) {
    const basePrices = {
      'motorcycle-lesson': 75,
      'transportation-pickup': 50
    };
    const basePrice = basePrices[this.serviceType] || 50;
    this.price = basePrice * (this.duration / 60);
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema); 