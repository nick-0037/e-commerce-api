const { User } = require('./models/User');
const jwt = require('jsonwebtoken');

class UserService {
  async createUser(data) {
    const { email, username, password } = data;
    const user = await User.create({ email, username, password });
    return user;
  };

  async findUserByUsername(username) {
    const user = await User.findOne({ where: { username }});
    return user;
  }

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