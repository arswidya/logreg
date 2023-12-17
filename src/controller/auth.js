const { firebase } = require('../config/firebase');

const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const errorHandlerMiddleware = require('../middleware/error-handler');

const login = async (req, res) => {
    const { email, password } = req.body;
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    const idToken = await user.getIdToken();
  
    req.session.uid = user.uid;
    req.session.email = user.email;
    // req.session.token = user.refreshToken;
    req.session.token = idToken;
    // req.session.accesstoken = user.accessToken;
  
    res.status(StatusCodes.OK).json({ 
      error: false,
      msg: 'Login successful',
      body: {
        uid: user.uid, 
        name: user.displayName,
        email: user.email, 
        token: idToken, 
        accesstoken: user.accessToken,
        // user,
      },
     });
  };

  module.exports = {
    login,
  };