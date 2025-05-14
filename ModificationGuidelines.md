# VoyageBuddy Modification Guidelines

This document provides detailed instructions for customizing and extending the VoyageBuddy travel planning application. It covers common modification scenarios, configuration options, and best practices.

## Table of Contents

1. [Application Overview](#application-overview)
2. [Project Structure](#project-structure)
3. [Frontend Customization](#frontend-customization)
   - [Logo and Branding](#logo-and-branding)
   - [Styling and Themes](#styling-and-themes)
   - [Adding New Pages](#adding-new-pages)
   - [Modifying Components](#modifying-components)
4. [Backend Configuration](#backend-configuration)
   - [Environment Variables](#environment-variables)
   - [Database Setup](#database-setup)
   - [Email Service](#email-service)
5. [Authentication System](#authentication-system)
6. [Admin Panel](#admin-panel)
7. [Deployment Guidelines](#deployment-guidelines)

## Application Overview

VoyageBuddy is a full-stack travel planning application built with the MERN stack (MongoDB, Express, React, Node.js). The application allows users to:

- Browse destinations in Bangladesh
- Plan trips with interactive map visualization
- Submit booking requests
- Read and post travel reviews
- Manage their bookings and reviews via dashboard

The admin panel provides functionality to:
- Manage destinations, users, reviews, and bookings
- Update user roles
- Confirm/cancel booking requests

## Project Structure

The project is organized into two main directories:

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

## Frontend Customization

### Logo and Branding

#### Changing the Logo and Favicon

The logo and favicon files are located in the `client/public` directory:

1. **Favicon**: Replace `client/public/favicon.ico` with your custom favicon.ico file
2. **Application Icons**: Replace the following files with your own icons:
   - `client/public/logo192.png` (192x192 pixels)
   - `client/public/logo512.png` (512x512 pixels)

3. **Site Title and Description**:
   Edit `client/public/index.html` to update the site title and description:
   ```html
   <title>Your New Title</title>
   <meta
     name="description"
     content="Your new description"
   />
   ```

4. **Logo in Header Component**:
   The site logo in the header is defined in `client/src/components/Header.js`. Modify the SVG or replace it with your own logo:
   
   ```jsx
   <Link to="/" className="flex items-center">
     <div className="text-purple-600 font-bold text-2xl flex items-center">
       {/* Replace this SVG with your logo */}
       <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
         <path d="..." />
       </svg>
       YourBrandName
     </div>
   </Link>
   ```

### Styling and Themes

#### Color Scheme

The application uses Tailwind CSS for styling. To modify the color scheme:

1. Edit `client/tailwind.config.js`:
   ```js
   module.exports = {
     theme: {
       extend: {
         colors: {
           primary: {
             // Replace with your primary color palette
             500: '#0ea5e9', // Main primary color
             600: '#0284c7', // Darker shade for hover states
             // ...other shades
           },
           secondary: {
             // Replace with your secondary color palette
             500: '#8b5cf6', // Main secondary color
             600: '#7c3aed', // Darker shade for hover states
             // ...other shades
           },
         },
       },
     },
   }
   ```

2. After modifying the theme, rebuild the CSS by running:
   ```
   cd client
   npm run build
   ```

#### Fonts

To change the font family:

1. Update the Google Fonts link in `client/public/index.html`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=YourChosenFont:wght@300;400;500;600;700&display=swap" rel="stylesheet">
   ```

2. Update the font family in `client/tailwind.config.js`:
   ```js
   fontFamily: {
     sans: ['YourChosenFont', 'sans-serif'],
   },
   ```

### Adding New Pages

To add a new page to the application:

1. Create a new React component in `client/src/pages/`
2. Add the route to `client/src/App.js`:
   ```jsx
   <Route path="/your-new-page" element={<YourNewPage />} />
   ```
   
   For protected routes, wrap the component:
   ```jsx
   <Route 
     path="/your-protected-page" 
     element={
       <ProtectedRoute>
         <YourProtectedPage />
       </ProtectedRoute>
     } 
   />
   ```

3. Add navigation links to the Header component (`client/src/components/Header.js`)

### Modifying Components

Core components are located in `client/src/components/`. When modifying:

1. **Header**: `Header.js` - Navigation links and user authentication state
2. **Footer**: `Footer.js` - Site links, contact info, and copyright
3. **Cards**: 
   - `DestinationCard.js` - Destination display cards
   - `ReviewCard.js` - User reviews display

When adding or modifying components, maintain the existing styling patterns using Tailwind CSS classes for consistency.

## Backend Configuration

### Environment Variables

The server uses environment variables for configuration, stored in `server/.env`:

```
NODE_ENV=development or production
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
SKIP_MONGODB=true or false (for development without MongoDB)

# Email configuration
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_username
SMTP_PASSWORD=your_smtp_password
SMTP_SECURE=true or false
EMAIL_FROM=info@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
```

### Database Setup

#### Local MongoDB Setup

1. Install MongoDB locally from [MongoDB website](https://www.mongodb.com/try/download/community)
2. Create a database named `voyagebuddy`
3. Update the MONGO_URI in your .env file:
   ```
   MONGO_URI=mongodb://localhost:27017/voyagebuddy
   ```
4. Set `SKIP_MONGODB=false` in your .env file

#### Cloud MongoDB Setup (MongoDB Atlas)

1. Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster and get your connection string
3. Update the MONGO_URI in your .env file:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/voyagebuddy
   ```
4. Set `SKIP_MONGODB=false` in your .env file

### Email Service

The application uses Nodemailer for sending email notifications. To configure:

1. Update the email settings in `server/.env`:
   ```
   SMTP_HOST=your_smtp_host (e.g., smtp.gmail.com)
   SMTP_PORT=your_smtp_port (e.g., 587)
   SMTP_USER=your_email@example.com
   SMTP_PASSWORD=your_email_password
   SMTP_SECURE=false (use true for port 465)
   EMAIL_FROM=info@yourdomain.com
   ADMIN_EMAIL=admin@yourdomain.com
   ```

2. For Gmail, you may need to:
   - Enable "Less secure app access" in your Google account
   - Or create an app password if using 2FA

3. The email templates are defined in `server/src/utils/emailService.js` and can be customized there.

## Authentication System

The authentication system uses JWT (JSON Web Tokens):

1. **Token Generation**: When users log in or register, a JWT token is generated containing their user ID and role.
2. **Token Storage**: Tokens are stored in the browser's localStorage.
3. **Authorization**: Protected routes require a valid token, and some routes require specific roles (e.g., admin).

To modify:

1. **Token Expiration**: Change `JWT_EXPIRE` in the .env file (default: 30 days)
2. **Secret Key**: Change `JWT_SECRET` in the .env file to a strong, unique value
3. **Role-Based Access**: Modify `server/src/middleware/auth.js` to add more roles or permissions

## Admin Panel

The admin panel (`/admin` route) provides management capabilities:

### Features:

1. **Destination Management**: Add, edit, and remove destinations
2. **User Management**: View, edit roles, and delete users
3. **Booking Management**: Confirm, modify, or cancel booking requests
4. **Review Moderation**: View and delete inappropriate reviews

### Customizing the Admin Panel:

1. The admin dashboard is defined in `client/src/pages/AdminDashboard.js`
2. Admin routes are protected in `client/src/App.js` using:
   ```jsx
   <Route 
     path="/admin" 
     element={
       <ProtectedRoute adminOnly={true}>
         <AdminDashboard />
       </ProtectedRoute>
     } 
   />
   ```

3. To add new admin features:
   - Add new sections to the admin dashboard component
   - Create corresponding API endpoints in the server
   - Update the auth middleware to protect these endpoints

## Deployment Guidelines

### Frontend Deployment

1. Build the React application:
   ```
   cd client
   npm run build
   ```

2. The build files will be in `client/build/` directory

3. These can be deployed to services like:
   - Netlify
   - Vercel
   - Firebase Hosting
   - Any static file hosting

### Backend Deployment

1. Prepare for production:
   ```
   cd server
   npm install --production
   ```

2. Set the environment variables on your hosting platform
3. The server can be deployed to:
   - Heroku
   - Digital Ocean
   - AWS
   - Any Node.js hosting

For a combined deployment, you can configure the server to serve the frontend build files in production mode, as defined in `server/src/index.js`.

---

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Errors**:
   - Check if MongoDB is running
   - Verify the connection string in the .env file
   - Check network connectivity

2. **JWT Authentication Errors**:
   - Clear browser localStorage and try logging in again
   - Check if JWT_SECRET is consistent
   - Verify token expiration settings

3. **Email Service Errors**:
   - Check SMTP credentials
   - Verify port and security settings
   - Test with a service like Mailtrap.io for development

For any other issues, please refer to the error logs in the console or contact the development team. 