const express = require('express');
const CvTemplate_Router = express.Router();
const { AddTemplateUser } = require('../controllers/CvTemplateController');
const { AsyncMiddleware } = require('../middlewares/Async');
const { Upload } = require('../middlewares/upload');
const { Cv, validateCv } = require('../database/CvScheme')
    //uploading file configurations 


CvTemplate_Router.use('/', (req, res, next) => {
    req.DB_Scheme = {
        ...req.DB_Scheme,
        Cvs: Cv,
        validateCvs: validateCv
    };
    next();
});
///APIs
CvTemplate_Router.post('/add', Upload('templates').single('cvTemplate'), AsyncMiddleware(AddTemplateUser));

module.exports = CvTemplate_Router;