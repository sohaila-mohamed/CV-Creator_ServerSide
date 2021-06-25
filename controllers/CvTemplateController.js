const _ = require('lodash');

async function AddTemplate(req, res, next) {

    //check if already registered 
    let temp = await req.DB_Scheme.templates.findOne({ id: req.body.tempId });
    if (temp) return next({ status: 400, message: 'Template Already registered' })
    console.log("template request", req.files['image'][0].filename);
    //create new user 
    const _temp = new req.DB_Scheme.templates({
        templateId: req.body.tempId,
        image: "/uploads/templatesImages/" + req.files['image'][0].filename,
        data: JSON.parse(req.body.data)
    });
    console.log(typeof(_temp.data), "temp ", _temp.data)
        //save mapping returned object to the client  
    _temp.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        next({ status: 500, message: 'Server Error', err: err })
        for (e in err.errors) { console.log(err.errors[e].message) }
    });
}

module.exports = {
    AddTemplate
}