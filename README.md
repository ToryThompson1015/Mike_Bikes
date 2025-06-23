# Mike's Bikes - Motorcycle Lessons & Transportation Services

A modern, responsive website for motorcycle lessons and transportation services built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- **Motorcycle Lessons**: Beginner, intermediate, and advanced lesson booking
- **Transportation Services**: Pickup and delivery services for motorcycles
- **Google Maps Integration**: Service area visualization
- **Responsive Design**: Mobile-friendly interface inspired by Adham Dannaway's portfolio
- **Booking System**: Complete appointment scheduling with form validation
- **Modern UI/UX**: Clean, professional design with smooth animations

## Pages

1. **Home**: Hero section with service overview
2. **About Us**: Company information and values
3. **Transportation Requests**: Service details and coverage areas
4. **Beginner Lessons**: Lesson types, pricing, and FAQs
5. **Booking Form**: Comprehensive appointment scheduling

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Express Validator** - Form validation
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Animation library
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **React DatePicker** - Date selection

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mikes-bikes
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/mikes-bikes
   PORT=5000
   NODE_ENV=development
   ```

5. **Start the development servers**
   ```bash
   # Start both backend and frontend
   npm run dev
   
   # Or start them separately
   npm run server    # Backend only
   npm run client    # Frontend only
   ```

## API Endpoints

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking by ID
- `PATCH /api/bookings/:id` - Update booking status
- `DELETE /api/bookings/:id` - Delete booking

### Lessons
- `GET /api/lessons/types` - Get lesson types and pricing
- `GET /api/lessons/availability` - Get lesson availability

### Transportation
- `GET /api/transportation/services` - Get transportation services
- `GET /api/transportation/areas` - Get service areas

## Database Schema

### Booking Model
```javascript
{
  name: String,
  email: String,
  phone: String,
  serviceType: String, // 'motorcycle-lesson' or 'transportation-pickup'
  date: Date,
  time: String,
  location: {
    address: String,
    coordinates: { lat: Number, lng: Number }
  },
  lessonType: String, // 'beginner', 'intermediate', 'advanced'
  pickupDetails: {
    from: String,
    to: String,
    vehicleType: String
  },
  specialRequests: String,
  status: String, // 'pending', 'confirmed', 'completed', 'cancelled'
  createdAt: Date
}
```

## Google Maps Integration

The application includes a Google Maps component for displaying service areas. To enable full Google Maps functionality:

1. Get a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/)
2. Add the API key to your environment variables
3. Update the `GoogleMap` component to use the actual Google Maps API

## Deployment

### Backend Deployment (Heroku)
1. Create a Heroku app
2. Set environment variables
3. Deploy using Git:
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

### Frontend Deployment
1. Build the React app:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `build` folder to your hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, contact:
- Email: info@mikesbikes.com
- Phone: (555) 123-4567

## Acknowledgments

- Design inspiration from [Adham Dannaway's portfolio](https://www.adhamdannaway.com/)
- Icons and images from Unsplash
- UI components and styling patterns from modern web design practices 