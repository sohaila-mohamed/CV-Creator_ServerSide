const express = require('express');
const CvTemplate_Router = express.Router();
const { AddTemplate } = require('../controllers/CvTemplateController');
const { AsyncMiddleware } = require('../middlewares/Async');
const { Upload } = require('../middlewares/upload');
const { templates } = require('../database/TemplatesScheme')
const { categories } = require('../database/CategoryScheme');
const { AddCategory, AddTemplateToCategory, getAllCategories, getCategoryTemplates } = require('../controllers/CategoryController');
//uploading file configurations 


CvTemplate_Router.use('/', (req, res, next) => {
    req.DB_Scheme = {
        ...req.DB_Scheme,
        templates: templates,
        categories: categories
    };
    next();
});
///APIs
CvTemplate_Router.post('/add/temp', Upload('templatesImages').fields([{ name: 'image', maxCount: 1 }, { name: "template", maxCount: 1 }]), AsyncMiddleware(AddTemplate));
CvTemplate_Router.post('/add/cat', Upload('templatesImages').single('image'), AsyncMiddleware(AddCategory));
CvTemplate_Router.put('/add/cat/temp', AsyncMiddleware(AddTemplateToCategory));
CvTemplate_Router.get('/cat', AsyncMiddleware(getAllCategories));
CvTemplate_Router.get('/cat/:name', AsyncMiddleware(getCategoryTemplates));


module.exports = CvTemplate_Router;