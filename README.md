# Wholesale Management System

A comprehensive web application for managing wholesale businesses, featuring customer segmentation, staff management, inventory tracking, and role-based access control.

## Features

- **Customer Segmentation**: Categorize customers based on purchase history, location, industry, etc.
- **Staff Management**: Track staff performance, clock-in/clock-out, and activities.
- **Product and Inventory Management**: Manage products, track inventory levels, and receive low stock alerts.
- **Role-Based Access Control**: Admin and staff user roles with different permissions.
- **Minimal UI**: Clean, intuitive, and responsive design.

## Tech Stack

- **Frontend**: React with Vite, React Router, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure

```
├── backend/                  # Back-end code
│   ├── models/               # Data models
│   ├── controllers/          # Request handlers
│   ├── routes/               # API endpoints
│   ├── middleware/           # Custom middleware
│   ├── config/               # Configuration files
│   ├── services/             # Business logic
│   └── server.js             # Main server file
│
├── frontend/                 # Front-end code
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Main application pages
│   │   ├── context/          # React context providers
│   │   ├── utils/            # Utility functions
│   │   ├── assets/           # Static assets
│   │   ├── App.jsx           # Main application component
│   │   └── main.jsx          # Entry point
│   └── index.html            # HTML entry point
│
└── README.md                 # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd wholesale-management
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/wholesale
   JWT_SECRET=your_jwt_secret_key_here
   ```

5. Create a `.env` file in the frontend directory with the following variables:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```
   cd ../frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Register a new account or login with existing credentials.
2. Navigate through the dashboard to access different features.
3. Admin users have access to all features, while staff users have limited access.

## License

This project is licensed under the MIT License.
