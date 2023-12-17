const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const getAllPosts = async (req, res) => {
    res.send('getAllPost');
}

module.exports= {
    getAllPosts
};