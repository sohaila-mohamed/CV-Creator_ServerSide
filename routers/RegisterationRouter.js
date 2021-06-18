const express = require('express');
const Registration_Router = express.Router();
const { AddNewUser } = require('../controllers/RegistrationController');
const { AsyncMiddleware } = require('../middlewares/Async');


///APIs
Registration_Router.post('/', AsyncMiddleware(AddNewUser));
module.exports = Registration_Router;