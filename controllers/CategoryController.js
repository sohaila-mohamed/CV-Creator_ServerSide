const _ = require('lodash');

async function AddCategory(req, res, next) {

    //check if already registered 
    let category = await req.DB_Scheme.categories.findOne({ name: req.body.name });
    if (category) return next({ status: 400, message: 'category Already registered' })
    console.log("category request", req.body);
    //create new user 
    const _cat = new req.DB_Scheme.categories({
        name: req.body.name,
        image: "/uploads/templatesImages/" + req.file.filename,
        templates: []
    });
    console.log(_cat, "_cat object")
        //save mapping returned object to the client  
    _cat.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        next({ status: 500, message: 'Server Error', err: err })
        for (e in err.errors) { console.log(err.errors[e].message) }
    });
}


async function AddTemplateToCategory(req, res, next) {

    //check if already registered 
    let temp = await req.DB_Scheme.templates.findOne({ templateId: req.body.tempId });
    if (!temp) return next({ status: 400, message: 'template not registered' });

    let category = await req.DB_Scheme.categories.findOne({ name: req.body.catName });
    if (!category) return next({ status: 400, message: 'category not registered' })

    if (category.templates.find(item => item == temp._id.toString())) return next({ status: 400, message: 'template already registered for this category' })
    console.log("add temp to category request", category.templates, "tempId", temp._id);
    //create new user 
    let result = await req.DB_Scheme.categories.updateOne({ name: req.body.catName }, {

        $push: { templates: temp._id }

    }).catch((err) => {
        next({ status: 500, message: 'Server Error', err: err })
        for (e in err.errors) { console.log(err.errors[e].message) }
    });
    res.send(result);
}

async function getAllCategories(req, res, next) {
    let categories = await req.DB_Scheme.categories.find({});
    if (!categories) return next({ status: 400, message: 'No categories' });
    res.send(_.map(categories, _.partialRight(_.pick, ['name', 'image'])));

}

async function getCategoryTemplates(req, res, next) {
    let category = await req.DB_Scheme.categories.findOne({ name: req.params.name }).populate('templates');
    if (!category) return next({ status: 400, message: 'category not registered' });
    res.send(_.map(category.templates, _.partialRight(_.pick, ['templateId', 'image'])));

}



module.exports = {
    AddCategory,
    AddTemplateToCategory,
    getAllCategories,
    getCategoryTemplates
}