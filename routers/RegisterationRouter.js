const express = require('express');
const Registration_Router = express.Router();
const { AddNewUser } = require('../controllers/RegistrationController');

///APIs
Registration_Router.post('/', AddNewUser);
module.exports = Registration_Router;