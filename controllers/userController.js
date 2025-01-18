const userService = require('../services/userService');

class UserController {
  
  async register(req, res) {
    try {
      const { email, username, password } = req.body;
      const user = await userService.createUser({ email, username, password});
      const token = userService.generateAuthToken(user);
      
      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        },
        token,
      });
    } catch (err) {
      res.status(400).json({ message: err.message});
    }
  };

  async login (req, res) {
    try {
      const { username, password } = req.body
      const user = await userService.findUserByUsername(user);

      if(!user || !(await User.validatePassword(password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = userService.generateAuthToken(user);

      res.status(200).json({
        message: 'Login successfully',
        user: {
          id: user.id,
          username: username,
          email: user.email
        },
        token
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
};

modules.exports = new UserController();