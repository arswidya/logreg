const express = require('express');
const router = express.Router()
const {
    getAllPosts, 
} = require('../controller/posts');

router.route('/').get(getAllPosts);

module.exports=router;