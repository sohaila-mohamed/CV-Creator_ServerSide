const express = require('express');
const User_Router = express.Router();
const { Authenticate } = require('../middlewares/Authentication');
const { AsyncMiddleware } = require('../middlewares/Async');
const { AddCvByID, getCvById, getUserCvListById, getUserPersonalData } = require('../controllers/UserCVsController.js')
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
User_Router.get('/cv/:userId/:cvId', Authenticate, AsyncMiddleware(getCvById));
User_Router.get('/data/:userId', Authenticate, AsyncMiddleware(getUserPersonalData));

module.exports = User_Router;