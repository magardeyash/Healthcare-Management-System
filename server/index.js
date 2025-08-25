const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './config.env' });

// Import database connection and models
const connectDB = require('./config/database');
const User = require('./models/User');
const Hospital = require('./models/Hospital');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access token required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (decoded.userType === 'hospital') {
      const hospital = await Hospital.findById(decoded.hospitalId).select('-password');
      if (!hospital) {
        return res.status(403).json({ message: 'Hospital not found' });
      }
      req.user = hospital;
      req.userType = 'hospital';
    } else {
      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
        return res.status(403).json({ message: 'User not found' });
      }
      req.user = user;
      req.userType = 'user';
    }

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Token expired' });
    }
    return res.status(500).json({ message: 'Token verification failed' });
  }
};

// Routes

// User Registration
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;

    // Validation
    if (!username || !email || !password || !userType) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    if (username.length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Check if username is taken
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      userType
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, userType: 'user' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser,
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }
    
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is deactivated' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, userType: 'user' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      user: user,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Hospital Registration
app.post('/api/hospital/register', async (req, res) => {
  try {
    const { hospitalName, email, password, licenseNumber, phone, address } = req.body;

    // Validation
    if (!hospitalName || !email || !password || !licenseNumber || !phone) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    if (hospitalName.length < 3) {
      return res.status(400).json({ message: 'Hospital name must be at least 3 characters' });
    }

    // Check if hospital already exists
    const existingHospital = await Hospital.findOne({ email });
    if (existingHospital) {
      return res.status(400).json({ message: 'Hospital already exists with this email' });
    }

    // Check if license number is taken
    const existingLicense = await Hospital.findOne({ licenseNumber });
    if (existingLicense) {
      return res.status(400).json({ message: 'License number is already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new hospital
    const newHospital = new Hospital({
      hospitalName,
      email,
      password: hashedPassword,
      licenseNumber,
      phone,
      address
    });

    await newHospital.save();

    // Generate JWT token
    const token = jwt.sign(
      { hospitalId: newHospital._id, email: newHospital.email, userType: 'hospital' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Hospital registered successfully',
      hospital: newHospital,
      token
    });

  } catch (error) {
    console.error('Hospital registration error:', error);
    
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email or license number already exists' });
    }
    
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Hospital Login
app.post('/api/hospital/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find hospital
    const hospital = await Hospital.findOne({ email });
    if (!hospital) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if hospital is active
    if (!hospital.isActive) {
      return res.status(401).json({ message: 'Account is deactivated' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, hospital.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { hospitalId: hospital._id, email: hospital.email, userType: 'hospital' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      hospital: hospital,
      token
    });

  } catch (error) {
    console.error('Hospital login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user profile
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    if (req.userType === 'hospital') {
      res.json({ hospital: req.user });
    } else {
      res.json({ user: req.user });
    }
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user profile
app.put('/api/profile', authenticateToken, async (req, res) => {
  try {
    const { username, email } = req.body;
    const updates = {};

    if (username) updates.username = username;
    if (email) updates.email = email;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }
    
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Change password
app.put('/api/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters' });
    }

    const user = await User.findById(req.user._id);
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all users (for admin - remove in production)
app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔐 JWT Secret: ${JWT_SECRET}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});
