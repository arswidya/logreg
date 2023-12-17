const express = require('express');

const UserController = require('../controller/users.js');

const router = express.Router();

const authenticateFirebase = require('../middleware/logs.js');

//CREATE POST
router.post('/', UserController.createNewUsers);

// READ GET
router.get('/', UserController.getAllUsers);

//UPDATE PATCH
router.patch('/:idUsers', authenticateFirebase, UserController.updateUsers);

//DELETE DELETE
router.delete('/:idUsers', UserController.deleteUsers);


module.exports = router;