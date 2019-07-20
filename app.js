const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// MongoDB params
const MDB = {
  username: process.env.MDB_USERNAME,
  password: process.env.MDB_PASSWORD,
  ptcl: process.env.MDB_PROTOCOLE_OLD,
  host: process.env.MDB_HOST_OLD,
  options: {
    dbName: 'test',
    useNewUrlParser: true,
    authSource: 'admin',
    ssl: true,
    keepAlive: true
  }
};

const urlMDB = MDB.ptcl + '://' + MDB.username + ':' + MDB.password + '@' + MDB.host;

// Routes
const routes = {
  auth: require('./routes/auth'),
  posts: require('./routes/posts')
};

// Middlewares
app.use(express.json());

// Track route
app.all('*', (req, res, next) => {
  console.log(req.method, 'requeste on:', req.url);
  next();
});

// Route Middlewares
app.use('/auth', routes.auth);
app.use('/posts', routes.posts);

// DB server connection
mongoose.connect(urlMDB, MDB.options);
const mdb = mongoose.connection;

mdb
  .on('connecting', () => console.log('connecting to mongoDB...'))
  .on('disconnecting', () => console.log('disconnecting from mongoDB server...'))
  .on('disconnected', () => console.log('disconnected from mongoDB server.'))
  .on('close', () => console.log('Connection to mongoDB server closed.'))
  .on('error', (err) => console.error('ERROR on connecting to mongoDB server:\n', err))
  .once('open', () => {
    console.log('Connnection to MongoDB SUCCESS');
  });

// Listening server
app.listen(3000, () => {
  console.log('listening on port 3000.');
});
