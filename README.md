# EDC-ATBP E-commerce Website

A modern e-commerce platform built with React and Firebase.

Made by Josh Bradley Cimanes for CMSC121 Machine Problem

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A Firebase account

### Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Create a Firestore database
5. Get your Firebase configuration:
   - Go to Project Settings
   - Scroll down to "Your apps"
   - Click the web icon (</>)
   - Register your app and copy the configuration

### Environment Setup
1. Create a `.env` file in the root directory
2. Add your Firebase configuration:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
```

### Running the Application
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Features
- User authentication
- Product browsing and searching
- Shopping cart functionality
- Admin dashboard for product management
- Responsive design for all devices

## Tech Stack
- React
- Firebase (Authentication, Firestore)
- Tailwind CSS
- React Router
- React Hot Toast

## Toggle Between Admin/Buyer Views

- Use the button in the Navbar or Admin page to switch between admin and buyer views.
- The role is managed by the `AuthContext` and is hardcoded for demonstration purposes.

## License

This project is licensed under the MIT License. 