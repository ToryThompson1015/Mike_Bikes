const nodemailer = require('nodemailer');

// Create test account for development (no authentication required)
let transporter;

// Initialize transporter
const initializeTransporter = async () => {
  try {
    // For development/testing, use Ethereal Email (no real credentials needed)
    const testAccount = await nodemailer.createTestAccount();
    
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    
    console.log('Email service initialized with test account');
    return true;
  } catch (error) {
    console.error('Failed to initialize email service:', error);
    return false;
  }
};

// Initialize on module load
initializeTransporter();

// Email templates
const emailTemplates = {
  bookingConfirmation: (booking) => ({
    subject: `Booking Confirmed - ${booking.confirmationCode}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">Mike's Bikes - Booking Confirmation</h2>
        <div style="background: #ecf0f1; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Confirmation Code: ${booking.confirmationCode}</h3>
          <p><strong>Service:</strong> ${booking.serviceType === 'motorcycle-lesson' ? 'Motorcycle Lesson' : 'Transportation Pickup'}</p>
          <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${booking.time}</p>
          <p><strong>Duration:</strong> ${booking.duration} minutes</p>
          <p><strong>Location:</strong> ${booking.location.address}</p>
          <p><strong>Price:</strong> $${booking.price}</p>
          ${booking.lessonType ? `<p><strong>Lesson Type:</strong> ${booking.lessonType}</p>` : ''}
          ${booking.pickupDetails ? `
            <p><strong>Pickup From:</strong> ${booking.pickupDetails.from}</p>
            <p><strong>Pickup To:</strong> ${booking.pickupDetails.to}</p>
          ` : ''}
        </div>
        <p>Please arrive 10 minutes before your scheduled time. If you need to reschedule or cancel, please call us at 267-404-MIKE.</p>
        <p>Thank you for choosing Mike's Bikes!</p>
      </div>
    `
  }),
  
  adminNotification: (booking) => ({
    subject: `New Booking - ${booking.confirmationCode}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #e74c3c;">New Booking Received</h2>
        <div style="background: #fdf2e9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Confirmation Code: ${booking.confirmationCode}</h3>
          <p><strong>Customer:</strong> ${booking.name}</p>
          <p><strong>Email:</strong> ${booking.email}</p>
          <p><strong>Phone:</strong> ${booking.phone}</p>
          <p><strong>Service:</strong> ${booking.serviceType === 'motorcycle-lesson' ? 'Motorcycle Lesson' : 'Transportation Pickup'}</p>
          <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${booking.time}</p>
          <p><strong>Duration:</strong> ${booking.duration} minutes</p>
          <p><strong>Location:</strong> ${booking.location.address}</p>
          <p><strong>Price:</strong> $${booking.price}</p>
          ${booking.specialRequests ? `<p><strong>Special Requests:</strong> ${booking.specialRequests}</p>` : ''}
        </div>
      </div>
    `
  })
};

// Send email function
const sendEmail = async (to, template, data) => {
  try {
    const emailContent = emailTemplates[template](data);
    
    // Log email content to console for development
    console.log('\n=== EMAIL WOULD BE SENT ===');
    console.log('To:', to);
    console.log('Subject:', emailContent.subject);
    console.log('Content:', emailContent.html);
    console.log('===========================\n');
    
    if (!transporter) {
      console.log('Email service not initialized, skipping actual send');
      return true;
    }
    
    const mailOptions = {
      from: '"Mike\'s Bikes" <noreply@mikesbikes.com>',
      to: to,
      subject: emailContent.subject,
      html: emailContent.html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    return true;
  } catch (error) {
    console.error('Email error:', error);
    console.log('Email content logged above - check console for details');
    return false;
  }
};

// Send booking confirmation to customer
const sendBookingConfirmation = async (booking) => {
  return await sendEmail(booking.email, 'bookingConfirmation', booking);
};

// Send notification to admin
const sendAdminNotification = async (booking) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'clarkkentxxi@gmail.com';
  return await sendEmail(adminEmail, 'adminNotification', booking);
};

module.exports = {
  sendEmail,
  sendBookingConfirmation,
  sendAdminNotification
}; 