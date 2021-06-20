const express = require('express');
const User_Router = express.Router();
const { Authenticate } = require('../middlewares/Authentication');
const { AsyncMiddleware } = require('../middlewares/Async');
const { AddCvByID } = require('../controllers/UserCVsController.js')
const { Cv, GenerateCvToken } = require('../database/CvScheme')



User_Router.use('/', (req, res, next) => {
    req.DB_Scheme = {
        ...req.DB_Scheme,
        Cvs: Cv,
        getCvToken: GenerateCvToken
    };
    next();
});

///APIs
User_Router.put('/cv', Authenticate, AsyncMiddleware(AddCvByID));

module.exports = User_Router;