require('dotenv').config()
require('express-async-errors');
const PORT = process.env.PORT || 4000;
const express = require('express');
const session = require('express-session');
const app = express();

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
// const admin = require('firebase-admin');

// const serviceAccount = require('./reglog-25c52-firebase-adminsdk-8zr70-96d8e620b8.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://reglog-25c52.firebaseio.com',
// });

// connectDB
const { db } = require('./config/firebase');

const middlewareLogRequest = require('./middleware/logs');
const isAuthenticated = require('./middleware/isAutheticated');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



app.use(middlewareLogRequest);
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  reset: false, 
  saveUninitialized: false,
}));

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/post', isAuthenticated, postRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



const start = async () => {
  try {
    db;
    app.listen(PORT, () =>
    console.log(`Server is listening on port ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();


// Initialize Firebase Admin with your credentials

