const express = require('express');
const Main_Router = express.Router();
const User_Router = require('./UserRouter');
const Login_Router = require('./LoginRouter');
const Registration_Router = require('./RegisterationRouter');
const { User, validate } = require("../database/UserScheme");
const CvTemplate_Router = require('./TemplateRouter');
// const { Authenticate } = require('../middlewares/Auth');


Main_Router.use('/', (req, res, next) => {
    req.DB_Scheme = {
        User: User,
        validateUser: validate
    };
    next();
});

Main_Router.use('/register', Registration_Router);

Main_Router.use('/login', Login_Router);

Main_Router.use('/user', User_Router);
Main_Router.use('/template', CvTemplate_Router);

module.exports = Main_Router;