require('dotenv').config()
const PORT = process.env.PORT || 5000;
const express = require('express');

const usersRoutes = require('./routes/users');

const admin = require('firebase-admin');

const serviceAccount = require('./reglog-25c52-firebase-adminsdk-8zr70-96d8e620b8.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://reglog-25c52.firebaseio.com',
});

const middlewareLogRequest = require('./middleware/logs')

const app = express();

app.use(middlewareLogRequest);
app.use(express.json());

app.use('/users', usersRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})



// Initialize Firebase Admin with your credentials

