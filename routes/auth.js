const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { registerValitator, loginValitator } = require('../validators/auth');

router.get('/', async (req, res) => {
  res.send('Authentication page');
});

router.post('/register', async (req, res) => {

  // Validation of the user input
  const { error, value } = registerValitator(req.body);
  if (error) {
    console.error('User registration failed:', error.details[0].message);
    return res.status(400).json({ Error: error.name });
  }

  try {

    // Checking the existance of the email
    // TODO: make a uniq index in the database for the email.
    const isUserExists = await User.findOne({ email: value.email });
    if (isUserExists) {
      console.log('The email already exists!');
      return res.status(400).json({ Error: 'The email already exists!' });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(value.password, salt);
    
    // Saving the new user
    value.password = hashedPass;
    const newUser = new User(value);
    const user = await newUser.save();
    console.log('Registred => User:', user.name, user.email, user.password);
    return res.json({ user: user._id });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ Error: err.message });
  }
});

router.post('/login', async (req, res) => {
  
  // Validation of the user input
  const { error, value } = loginValitator(req.body);
  if (error) {
    console.error('FAILED User login:', error.details[0].message);
    return res.status(400).json({ Error: error.name });
  }


});

module.exports = router;
