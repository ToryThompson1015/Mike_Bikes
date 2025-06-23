const express = require('express');
const router = express.Router();

// Get transportation services
router.get('/services', (req, res) => {
  const services = [
    {
      id: 'motorcycle-pickup',
      name: 'Motorcycle Pickup',
      description: 'Professional pickup and delivery of motorcycles for service, storage, or relocation.',
      price: 'Starting at $75',
      includes: [
        'Safe motorcycle transport',
        'Insurance coverage',
        'Flexible scheduling',
        'Real-time tracking'
      ]
    },
    {
      id: 'emergency-pickup',
      name: 'Emergency Pickup',
      description: '24/7 emergency pickup service for broken down motorcycles.',
      price: 'Starting at $100',
      includes: [
        '24/7 availability',
        'Quick response time',
        'Temporary storage',
        'Service recommendations'
      ]
    },
    {
      id: 'long-distance',
      name: 'Long Distance Transport',
      description: 'Cross-country motorcycle transportation for relocation or events.',
      price: 'Contact for quote',
      includes: [
        'Enclosed transport',
        'Full insurance',
        'Door-to-door service',
        'Delivery tracking'
      ]
    }
  ];
  
  res.json(services);
});

// Get service areas
router.get('/areas', (req, res) => {
  const serviceAreas = [
    {
      city: 'Los Angeles',
      state: 'CA',
      coverage: 'Full coverage including surrounding areas',
      responseTime: '1-2 hours'
    },
    {
      city: 'San Francisco',
      state: 'CA',
      coverage: 'Bay Area and Peninsula',
      responseTime: '1-3 hours'
    },
    {
      city: 'San Diego',
      state: 'CA',
      coverage: 'County-wide service',
      responseTime: '1-2 hours'
    }
  ];
  
  res.json(serviceAreas);
});

module.exports = router; 