const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided'});
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Invalid token format'});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: you need to be an admin'});
    }

    next();
  } catch (err) {
      console.error(err)
      return res.status(401).json({ message: 'Invalid or expired token'})
  }
};

module.exports = isAdmin;