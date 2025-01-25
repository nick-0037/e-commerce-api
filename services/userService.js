const db = require('../models');
const User = db.User;
const jwt = require('jsonwebtoken');

class UserService {
  async createUser(data) {
    const { email, username, password } = data;

    const user = await User.create({ email, username, password });
    
    return {
      message: 'User registered successfully',
      user
    };
  };
  
  async loginUser({ username, password }) {
    const user = await UserService.findUserByUsername(username);
    
    const isValidPassword = await user.validatePassword(password)

    if(!isValidPassword) {
      const error = new Error('Invalid password');
      error.statusCode = 401;
      throw error;
    }

    return { 
      message: 'Login successful',
      user
    };
  };
  
  static async findUserByUsername(username) {
    const user = await User.findOne({ where: { username }});

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    };

    return user;
  };
  
  generateAuthToken(user) {
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role},
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return token;
  };
};

module.exports = new UserService();