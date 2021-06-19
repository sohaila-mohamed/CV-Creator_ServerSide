const _ = require('lodash');

async function AddTemplateUser(req, res, next) {

    //validate request body
    // const { error } = req.DB_Scheme.validateCvs(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    //check if already registered 
    let temp = await req.DB_Scheme.Cvs.findOne({ id: req.body.cvId });
    if (temp) return next({ status: 400, message: 'Template Already registered' })
    console.log("template request", req.body);
    //create new user 
    const _temp = new req.DB_Scheme.Cvs({
        id: req.body.cvId,
        htmlTemplate: req.file.filename
    });
    console.log(_temp, "temp object")

    //save mapping returned object to the client  
    _temp.save().then((result) => {
        res.send(_.pick(result, ['_id', 'htmlTemplate']));
    }).catch((err) => {
        next({ status: 500, message: 'Server Error', err: err })
        for (e in err.errors) { console.log(err.errors[e].message) }
    });
}

module.exports = {
    AddTemplateUser
}