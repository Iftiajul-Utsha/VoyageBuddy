# VoyageBuddy

VoyageBuddy is a full-stack travel planning website that helps users easily plan their travels across Bangladesh. It allows them to select destinations and dates, visualize plans on a map, and submit booking requests. Users can also read and post travel experiences (reviews). Admins can manage destinations, users, and reviews via a dashboard.

## Tech Stack

### Frontend
- React.js (with hooks)
- Tailwind CSS for styling
- React Router for navigation
- Google Maps API for trip planning visualization
- JWT for authentication

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT-based authentication
- Nodemailer for email notifications

## Features

- **User Authentication**: Fully-functional JWT-based login and signup
- **Trip Planning**: Interactive interface with Google Maps integration
- **Reviews System**: Read and post travel experiences
- **Booking System**: Make booking requests with email notifications
- **Admin Dashboard**: Manage destinations, users, reviews, and bookings
- **Responsive Design**: Works on all screen sizes

## Project Structure

```
voyagebuddy/
├── client/                  # Frontend React application
│   ├── public/              # Static files
│   └── src/                 # React source code
│       ├── components/      # Reusable components
│       ├── contexts/        # Context providers
│       ├── pages/           # Page components
│       └── utils/           # Utility functions
│
└── server/                  # Backend Node.js application
    └── src/
        ├── config/          # Configuration files
        ├── controllers/     # Request handlers
        ├── middleware/      # Custom middleware
        ├── models/          # Mongoose models
        ├── routes/          # API routes
        └── utils/           # Utility functions
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/voyagebuddy.git
   cd voyagebuddy
   ```

2. Install dependencies for both client and server:
   ```
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```

4. To use the email service, add these variables to the `.env` file:
   ```
   SMTP_HOST= sandbox.smtp.mailtrap.io
   SMTP_PORT= 2525
   SMTP_USER= 35749cb293ae6c
   SMTP_PASSWORD=e1611cf3545b3c
   SMTP_SECURE=true
   EMAIL_FROM=iftiajul99.com
   ADMIN_EMAIL=iftiajul99.com
   ```

5. For Google Maps integration, obtain an API key from the Google Cloud Platform and add it to your project.

### Running the Application

1. Start the backend server:
   ```
   cd server
   npm run dev
   ```

2. In a separate terminal, start the frontend development server:
   ```
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## License

This project is licensed under the MIT License. 