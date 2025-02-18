const db = require("../models");
const User = db.User;
const jwt = require("jsonwebtoken");

class UserService {
  async createUser(data) {
    const { email, username, password } = data;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      const error = new Error("Email is already in use");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.create({ email, username, password });

    return user;
  }

  async loginUser({ username, password }) {
    const user = await UserService.findUserByUsername(username);

    const isValidPassword = await user.validatePassword(password);

    if (!isValidPassword) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    return user;
  }

  static async findUserByUsername(username) {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    return user;
  }

  async getUserFromToken(authHeader) {
    if (!authHeader) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { id: decoded.userId } });

    return user;
  }

  generateAuthToken(user) {
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return token;
  }
}

module.exports = new UserService();
