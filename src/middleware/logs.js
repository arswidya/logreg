const logsRequest = (req, res, next) => {
    console.log('Terjadi request ke PATH: ', req.path);
    next();
}

const authenticateFirebase = async (req, res, next) => {
    try {
      const idToken = req.header('Authorization').replace('Bearer ', '');
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(401).json({
        message: 'Unauthorized',
        error: error.message,
      });
    }
  };
  

module.exports = logsRequest;