const express = require('express');
const Main_Router = express.Router();
// const Users_Router = require('./UserRouter');
// const Login_Router = require('./LoginRouter');
const Registration_Router = require('./RegisterationRouter');
const { User, validate } = require("../database/UserScheme");
// const { Authenticate } = require('../middlewares/Auth');


Main_Router.use('/', (req, res, next) => {
    req.DB_Scheme = {
        User: User,
        validateUser: validate
    };
    next();
});

Main_Router.use('/register', Registration_Router);

// API_Router.use('/login', Login_Router);

// API_Router.use('/user', Users_Router);

module.exports = Main_Router;