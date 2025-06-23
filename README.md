# Mike's Bikes - Motorcycle Lessons & Transportation Services

A full-stack MERN application for booking motorcycle lessons and transportation services, featuring real-time appointment scheduling, email notifications, and an admin dashboard.

## 🚀 Features

### For Customers
- **Easy Booking System**: Simple form to book motorcycle lessons or transportation services
- **Real-time Availability**: See available time slots in real-time
- **Duration Selection**: Choose from 30, 60, 90, or 120-minute sessions
- **Price Calculation**: Automatic pricing based on service type and duration
- **Email Confirmations**: Receive booking confirmations with unique confirmation codes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### For Administrators
- **Admin Dashboard**: Complete booking management system
- **Real-time Statistics**: View pending, confirmed, completed, and cancelled bookings
- **Filter & Search**: Filter bookings by status, date, and service type
- **Status Management**: Update booking statuses (confirm, complete, cancel)
- **Email Notifications**: Receive notifications for new bookings
- **Secure Access**: Protected admin area with authentication

### Technical Features
- **MERN Stack**: MongoDB, Express.js, React.js, Node.js
- **Real-time Updates**: Live availability checking
- **Email Integration**: Automated email notifications using Nodemailer
- **Responsive UI**: Modern design with Framer Motion animations
- **Form Validation**: Comprehensive client and server-side validation
- **Error Handling**: Robust error handling and user feedback

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ToryThompson1015/Mike_Bikes.git
   cd Mike_Bikes
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install
   cd ..
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit the `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/mikes_bikes
   
   # Email Configuration (for booking notifications)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password_here
   ADMIN_EMAIL=admin@mikesbikes.com
   
   # Google Maps API (for geocoding and maps)
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

4. **Set up email notifications** (optional but recommended)
   - Create a Gmail account or use an existing one
   - Enable 2-factor authentication
   - Generate an App Password
   - Add the email and app password to your `.env` file

5. **Set up MongoDB**
   - **Local MongoDB**: Install and start MongoDB locally
   - **MongoDB Atlas**: Create a free cluster and get your connection string

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
This will start both the backend server (port 5000) and frontend development server (port 3000).

### Production Mode
```bash
npm run build
npm start
```

## 📱 Using the Application

### For Customers

1. **Visit the website**: Navigate to `http://localhost:3000`
2. **Choose a service**: Select "Motorcycle Lessons" or "Transportation"
3. **Fill out the form**: Enter your details and preferences
4. **Select duration**: Choose from 30, 60, 90, or 120 minutes
5. **Pick date and time**: Select from available time slots
6. **Submit booking**: Review your booking and submit
7. **Receive confirmation**: Check your email for booking confirmation

### For Administrators

1. **Access admin panel**: Navigate to `http://localhost:3000/admin/login`
2. **Login credentials**:
   - Username: `admin`
   - Password: `mikesbikes2024`
3. **Manage bookings**: View, filter, and update booking statuses
4. **Monitor statistics**: Track booking metrics and trends

## 🔧 API Endpoints

### Bookings
- `GET /api/bookings` - Get all bookings (with optional filters)
- `GET /api/bookings/available-slots` - Get available time slots for a date
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/:id` - Get booking by ID
- `GET /api/bookings/confirm/:code` - Get booking by confirmation code
- `PATCH /api/bookings/:id` - Update booking status
- `PATCH /api/bookings/:id/cancel` - Cancel a booking
- `DELETE /api/bookings/:id` - Delete a booking (admin only)

### Lessons
- `GET /api/lessons` - Get all lessons
- `POST /api/lessons` - Create a new lesson

### Transportation
- `GET /api/transportation` - Get all transportation requests
- `POST /api/transportation` - Create a new transportation request

## 📧 Email Notifications

The system automatically sends email notifications for:

- **Booking Confirmations**: Sent to customers with booking details and confirmation code
- **Admin Notifications**: Sent to administrators for new bookings

### Email Setup
1. Use a Gmail account with 2FA enabled
2. Generate an App Password
3. Add credentials to `.env` file
4. Test by creating a booking

## 🔒 Security Features

- **Input Validation**: Comprehensive validation on both client and server
- **Admin Authentication**: Protected admin routes
- **Time Slot Validation**: Prevents double bookings
- **Business Hours**: Enforces 9 AM - 6 PM booking hours
- **Error Handling**: Secure error messages without exposing sensitive data

## 🎨 Customization

### Styling
- Modify `styled-components` in component files
- Update color schemes in theme variables
- Customize animations in Framer Motion components

### Business Logic
- Update pricing in `models/Booking.js`
- Modify business hours in `routes/bookings.js`
- Customize email templates in `utils/emailService.js`

### Service Areas
- Update Google Maps coordinates in map components
- Modify service area radius and locations

## 🚀 Deployment

### Heroku
1. Create a Heroku account
2. Install Heroku CLI
3. Create a new Heroku app
4. Set environment variables in Heroku dashboard
5. Deploy using Git

### Vercel/Netlify
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

## 📊 Database Schema

### Booking Model
```javascript
{
  name: String,
  email: String,
  phone: String,
  serviceType: String,
  date: Date,
  time: String,
  duration: Number,
  location: {
    address: String,
    coordinates: { lat: Number, lng: Number }
  },
  lessonType: String,
  pickupDetails: {
    from: String,
    to: String
  },
  specialRequests: String,
  status: String,
  confirmationCode: String,
  paymentStatus: String,
  price: Number,
  instructor: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions:
- **Phone**: 267-404-MIKE
- **Email**: admin@mikesbikes.com
- **Service Area**: Atlanta, GA (100-mile radius)

## 📄 License

This project is licensed under the MIT License.

## 🔄 Updates & Maintenance

### Regular Tasks
- Monitor booking statistics
- Update availability as needed
- Review and respond to special requests
- Maintain email service credentials
- Backup database regularly

### Future Enhancements
- Payment processing integration
- SMS notifications
- Customer accounts and booking history
- Instructor scheduling system
- Mobile app development

---

**Mike's Bikes** - Professional motorcycle lessons and transportation services in Atlanta, GA. 