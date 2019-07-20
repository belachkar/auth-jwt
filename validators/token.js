const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('auth-token');

  // Check token exists
  if (!token) return res.status(401).json({ Error: 'Access denied' });

  // Verify the token
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error(err.message);
    res.ststus(400).json({ Error: 'Invalid token' });
  }
};
