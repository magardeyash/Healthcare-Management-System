# Healthcare Website Backend

A robust Node.js backend with MongoDB integration and JWT authentication for the healthcare website.

## 🚀 Features

- **User Authentication**: Register, Login, Logout with JWT
- **MongoDB Integration**: Persistent data storage
- **Password Security**: Bcrypt hashing with salt rounds
- **Input Validation**: Comprehensive form validation
- **Error Handling**: Detailed error messages
- **Profile Management**: Update profile and change password
- **Admin Features**: Role-based access control

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Create database: `healthcare`

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Get connection string
4. Update `config.env` with your connection string

### 3. Environment Configuration
Create `config.env` file:
```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/healthcare
```

### 4. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🔌 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/profile` - Get user profile (protected)
- `PUT /api/profile` - Update user profile (protected)
- `PUT /api/change-password` - Change password (protected)

### Admin (Protected)
- `GET /api/users` - Get all users (admin only)

### Health Check
- `GET /api/health` - Server and database status

## 📊 Database Schema

### User Model
```javascript
{
  username: String (required, unique, 3-50 chars),
  email: String (required, unique, valid email),
  password: String (required, min 6 chars, hashed),
  role: String (enum: 'user', 'admin', default: 'user'),
  isActive: Boolean (default: true),
  timestamps: true
}
```

## 🔐 Security Features

- **JWT Tokens**: 24-hour expiration
- **Password Hashing**: Bcrypt with 12 salt rounds
- **Input Validation**: Comprehensive validation rules
- **CORS**: Cross-origin resource sharing enabled
- **Error Handling**: No sensitive data exposure

## 🧪 Testing

### Test Registration
```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "123456"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456"
  }'
```

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check if MongoDB is running
   - Verify connection string in `config.env`
   - Check firewall settings

2. **Port Already in Use**
   - Change PORT in `config.env`
   - Kill process using the port

3. **JWT Token Issues**
   - Check JWT_SECRET in `config.env`
   - Verify token expiration

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` in `config.env`

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `JWT_SECRET` | JWT signing secret | Required |
| `NODE_ENV` | Environment mode | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/healthcare |

## 🔄 Database Operations

### Create User
```javascript
const user = new User({
  username: 'john_doe',
  email: 'john@example.com',
  password: 'hashedPassword'
});
await user.save();
```

### Find User
```javascript
const user = await User.findOne({ email: 'john@example.com' });
```

### Update User
```javascript
const updatedUser = await User.findByIdAndUpdate(
  userId,
  { username: 'new_username' },
  { new: true, runValidators: true }
);
```

## 🚀 Production Deployment

1. Set `NODE_ENV=production`
2. Use strong JWT_SECRET
3. Enable MongoDB authentication
4. Set up proper CORS origins
5. Use environment variables for sensitive data
6. Set up logging and monitoring
7. Use PM2 or similar process manager

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review error logs
3. Verify environment configuration
4. Test database connectivity

