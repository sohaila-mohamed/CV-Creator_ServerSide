const express = require('express');
const Login_Router = express.Router();
// const multer = require('multer');
// const { Authenticate } = require('../middlewares/Auth');
const { LoginUser } = require('../controllers/LoginController');
// const { AsyncMiddleware } = require('../middlewares/async');
// const { upload } = require('../middlewares/upload');
//uploading file configurations 



///APIs


Login_Router.post('/log', LoginUser);

module.exports = Login_Router;