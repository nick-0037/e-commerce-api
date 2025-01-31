const userService = require("../services/userService");

class UserController {
  async register(req, res, next) {
    try {
      const { email, username, password } = req.body;
      const user = await userService.createUser({
        email,
        username,
        password,
      });

      res.status(201).json({
        message: 'User created successfully',
        user
      });
    } catch (err) {
        next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await userService.loginUser({
        username,
        password,
      });
      const token = userService.generateAuthToken(user);

      res.status(200).json({
        message: 'Login successful',
        user,
        token,
      });
    } catch (err) {
        next(err);
    }
  }
}

module.exports = new UserController();