const express = require('express');
const bodyParser = require('body-parser');
const { db } = require('./config/firebaseConfig');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const verifyToken = require('./middleware/verifyToken');

const app = express();

app.use(bodyParser.json());

// Use your authRoutes for authentication endpoints
app.use('/auth', authRoutes);

// Example of a protected route using the verifyToken middleware
app.get('/api/user/protectedRoute', verifyToken, (req, res) => {
  // Access the user's information from req.user
  const { uid, email } = req.user;

  // Example: Return the user's information as a JSON response
  res.status(200).json({ 
    message: 'You are authorized to access this protected route',
    user: { 
      userId: uid, 
      userEmail: email 
    } 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Connected to Firebase');
});
