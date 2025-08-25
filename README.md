# Healthcare Website - Unified Medical Repository

A comprehensive healthcare website that serves as a unified medical repository for medical records, featuring both public-facing information and secure user dashboards.

## Features

### Public Website
- **Home**: Welcome page with healthcare information
- **Services**: Overview of healthcare services offered
- **About Us**: Information about the healthcare organization
- **Contact**: Contact information and form
- **Authentication**: Login/Signup system for users and hospitals

### User Dashboard (After Login)
After logging in as a user, you'll be redirected to a comprehensive dashboard with three main sections:

#### 1. Profile Dashboard (UserHome)
- **Welcome Section**: Personalized greeting with user information
- **Health Statistics**: Key metrics including total records, health score, appointments, and last visit
- **Profile Information**: User details, account type, and member since date
- **Recent Activities**: Timeline of recent medical activities
- **Quick Actions**: Buttons for common tasks (upload record, book appointment, search records)

#### 2. Analytics Dashboard (UserAnalytics)
- **Health Metrics**: Real-time vital signs (blood pressure, heart rate, temperature, weight)
- **Monthly Visits Chart**: Visual representation of hospital visits and records over time
- **Record Types Distribution**: Breakdown of medical records by type (lab tests, imaging, prescriptions, etc.)
- **Health Score Trend**: Line chart showing health score progression over time
- **Insights & Recommendations**: AI-powered health insights and personalized recommendations

#### 3. Medical Records Management (MedicalRecords)
- **Upload Records**: Form to upload new medical documents with metadata
- **My Uploads**: View and manage records uploaded by the user
- **Hospital Records**: View records uploaded by hospitals and medical facilities
- **Record Summary**: Statistics showing total records, personal uploads, and hospital records

## Technology Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT tokens
- **Styling**: Custom CSS animations and Tailwind utilities

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd healthcare-website
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Set up environment variables**
   Create a `config.env` file in the server directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

5. **Start the backend server**
   ```bash
   cd server
   npm start
   ```

6. **Start the frontend development server**
   ```bash
   npm start
   ```

## Usage

### For Users
1. Navigate to the website
2. Click "Sign Up" and select "User" account type
3. Fill in your details and create an account
4. Login with your credentials
5. You'll be automatically redirected to the user dashboard
6. Navigate between Profile Dashboard, Analytics, and Medical Records using the tabs

### For Hospitals
1. Navigate to the website
2. Click "Sign Up" and select "Hospital" account type
3. Fill in hospital details and create an account
4. Login to access hospital-specific features

## Design Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional healthcare-themed interface
- **Smooth Animations**: Custom CSS animations for enhanced user experience
- **Color Scheme**: Professional blue-cyan gradient theme
- **Interactive Elements**: Hover effects and smooth transitions throughout

## Security Features

- JWT-based authentication
- Secure password handling
- Protected routes for authenticated users
- Role-based access control (users vs hospitals)

## File Structure

```
src/
├── Components/
│   ├── UserDashboard.jsx      # Main dashboard container
│   ├── UserHome.jsx           # Profile dashboard
│   ├── UserAnalytics.jsx      # Analytics and charts
│   ├── MedicalRecords.jsx     # Records management
│   ├── Navbar.jsx             # Navigation component
│   ├── Home.jsx               # Public home page
│   ├── Login.jsx              # Login modal
│   ├── Signup.jsx             # Signup modal
│   └── ...                    # Other components
├── App.js                     # Main application component
└── App.css                    # Custom styles and animations
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.

