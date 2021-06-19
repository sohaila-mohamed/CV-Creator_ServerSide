const express = require('express');
const User_Router = express.Router();
const { Authenticate } = require('../middlewares/Authentication');
const { AsyncMiddleware } = require('../middlewares/Async');
const { AddCvByID } = require('../controllers/UserCVsController.js')
    //uploading file configurations 



///APIs
User_Router.put('/cv', Authenticate, AsyncMiddleware(AddCvByID));

module.exports = User_Router;