const express = require('express');
const router = express.Router();

// Get lesson types and pricing
router.get('/types', (req, res) => {
  const lessonTypes = [
    {
      id: 'beginner',
      name: 'Beginner Lesson',
      description: 'Perfect for first-time riders. Learn the basics of motorcycle operation, safety, and road rules.',
      duration: '2 hours',
      price: 150,
      includes: [
        'Basic motorcycle controls',
        'Safety gear instruction',
        'Road rules overview',
        'Practice in controlled environment'
      ]
    },
    {
      id: 'intermediate',
      name: 'Intermediate Lesson',
      description: 'For riders with some experience. Improve your skills and confidence on the road.',
      duration: '2.5 hours',
      price: 180,
      includes: [
        'Advanced riding techniques',
        'Traffic navigation',
        'Emergency maneuvers',
        'Highway riding'
      ]
    },
    {
      id: 'advanced',
      name: 'Advanced Lesson',
      description: 'For experienced riders. Master advanced techniques and prepare for licensing.',
      duration: '3 hours',
      price: 220,
      includes: [
        'Advanced cornering',
        'High-speed control',
        'Group riding',
        'Licensing preparation'
      ]
    }
  ];
  
  res.json(lessonTypes);
});

// Get lesson availability
router.get('/availability', (req, res) => {
  // This would typically check against existing bookings
  // For now, return sample availability
  const availability = {
    message: 'Contact us for current availability',
    contactInfo: {
      phone: '(555) 123-4567',
      email: 'lessons@mikesbikes.com'
    }
  };
  
  res.json(availability);
});

module.exports = router; 