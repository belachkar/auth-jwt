const router = require('express').Router();
const verifyToken = require('../validators/token');

// Route protected by "verifyToken" middleware.
router.get('/', verifyToken, (req, res) => {
  res.send(req.user);
});

module.exports = router;