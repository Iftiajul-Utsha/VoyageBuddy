const nodemailer = require('nodemailer');

// Create a transporter with configuration
const createTransporter = () => {
  // For production, you would use actual SMTP credentials
  if (process.env.NODE_ENV === 'production') {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  } 
  
  // For development or testing, use ethereal.email
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: process.env.ETHEREAL_USER || 'ethereal.user@ethereal.email',
      pass: process.env.ETHEREAL_PASSWORD || 'ethereal_password'
    }
  });
};

// Send booking email to admin
exports.sendBookingEmail = async (booking, user, destination) => {
  try {
    const transporter = createTransporter();
    
    // Format date
    const formattedDate = new Date(booking.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'info@voyagebuddy.com',
      to: process.env.ADMIN_EMAIL || 'admin@voyagebuddy.com',
      subject: `New Booking Request - ${destination.name}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Destination:</strong> ${destination.name}, ${destination.location}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Number of Travelers:</strong> ${booking.travelers}</p>
        <p><strong>Status:</strong> ${booking.status}</p>
        <hr>
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone || 'Not provided'}</p>
        ${booking.note ? `<p><strong>Special Note:</strong> ${booking.note}</p>` : ''}
        <hr>
        <p>Please log in to the admin dashboard to manage this booking.</p>
      `
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    // Log email sent (for development)
    if (process.env.NODE_ENV !== 'production') {
      console.log('Email sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

// Send booking confirmation email to user
exports.sendBookingConfirmationEmail = async (booking, user, destination) => {
  try {
    const transporter = createTransporter();
    
    // Format date
    const formattedDate = new Date(booking.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'info@voyagebuddy.com',
      to: user.email,
      subject: `Booking Confirmation - ${destination.name}`,
      html: `
        <h2>Your Booking is Confirmed!</h2>
        <p>Dear ${user.name},</p>
        <p>Thank you for choosing VoyageBuddy. Your booking has been confirmed.</p>
        <h3>Booking Details</h3>
        <p><strong>Destination:</strong> ${destination.name}, ${destination.location}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Number of Travelers:</strong> ${booking.travelers}</p>
        <p><strong>Status:</strong> ${booking.status}</p>
        ${booking.note ? `<p><strong>Your Note:</strong> ${booking.note}</p>` : ''}
        <hr>
        <p>If you have any questions, please contact us at support@voyagebuddy.com or call +880 1234 567890.</p>
        <p>We're looking forward to making your trip unforgettable!</p>
        <p>Best regards,<br>The VoyageBuddy Team</p>
      `
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    // Log email sent (for development)
    if (process.env.NODE_ENV !== 'production') {
      console.log('Email sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}; 