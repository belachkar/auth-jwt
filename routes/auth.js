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

    // Checking if the email exists already
    // TODO: make a uniq index in the database for the email. this code can then be droped
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

  try {

    // Get the user by email
    const user = await User.findOne({ email: value.email });

    // Checking the user exists
    if (!user) {
      console.log('The email does not exists!');
      return res.status(400).json({ Error: 'Wrong email or password!' });
    }

    // Checking the password match
    const isPassMatch = await bcrypt.compare(value.password, user.password);
    if (!isPassMatch) {
      console.log('The password does not match!');
      return res.status(400).json({ Error: 'Wrong email or password!' });
    }

    // The user exists and the pass match, must login.
    console.log('User', user.name, 'Logged in');
    return res.json({ Message: 'User '+user.name+' Logged in successfuly' });

  } catch (err) {
    console.error(err);
    return res.status(400).json({ Error: err.message });
  }


});

module.exports = router;
