const express = require('express');
const app = express();
const authRoute = require('./routes/auth');

// Middlewares
app.use('/auth', authRoute);

// Listening server
app.listen(3000, () => {
  console.log('listening on port 3000.');
});
