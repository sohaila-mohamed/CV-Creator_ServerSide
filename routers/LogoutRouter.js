const express = require('express');
const Logout_Router = express.Router();
const { Logout } = require('../controllers/LogoutController');
const { AsyncMiddleware } = require('../middlewares/Async');
//uploading file configurations 



///APIs
Logout_Router.post('/', AsyncMiddleware(Logout));

module.exports = Logout_Router;