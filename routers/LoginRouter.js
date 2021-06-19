const express = require('express');
const Login_Router = express.Router();
const { Authenticate } = require('../middlewares/Authentication');
const { LoginUser } = require('../controllers/LoginController');
const { UpdateUserData } = require('../controllers/UpdateController');
const { AsyncMiddleware } = require('../middlewares/Async');
const { Upload } = require('../middlewares/upload');
//uploading file configurations 



///APIs
Login_Router.post('/log', AsyncMiddleware(LoginUser));
Login_Router.put('/update/:id', Authenticate, Upload('images').single('profileImg'), AsyncMiddleware(UpdateUserData));

module.exports = Login_Router;