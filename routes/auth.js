const router = require('express').Router();

router.get('/', async (req, res) => {
  res.send('Authentication page');
});

router.post('/register', async (req, res) => {
  res.send('Register page');
});

router.post('/signup', async (req, res) => {
  res.send('Signup page.');
});

module.exports = router;
