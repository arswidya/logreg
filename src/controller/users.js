const UsersModel = require('../models/users');

const getAllUsers = async (req, res) => {
    try {
        const [data] = await UsersModel.getAllUsers();

        res.json({
            message: 'GET all users success',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }  
}

const createNewUsers = async (req, res) => {
    const {body} = req;

    try {
        await UsersModel.createNewUser(body);
        res.json({
            message: 'Create new users success',
            data: body
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    } 
}

const updateUsers = async (req, res) => {
    const {idUsers} = req.params;
    const {body} = req;
    try {
        await UsersModel.updateUsers(body, idUsers);
        res.json({
            message: 'Update user success',
            data: {
                id: idUsers,
                ...body
            },
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const deleteUsers = async (req, res) => {
    const {idUsers} = req.params;
    try {
        await UsersModel.deleteUsers(idUsers);
        res.json({
            message: 'Delete user success',
            data: null
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
        
    }
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
  


module.exports = {
    getAllUsers,
    createNewUsers,
    updateUsers,
    deleteUsers,
    authenticateFirebase,
}