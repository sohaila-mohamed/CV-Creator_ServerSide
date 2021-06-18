const bcrypt = require('bcrypt');
const _ = require('lodash');

async function AddNewUser(req, res, next) {

    //validate request body
    const { error } = req.DB_Scheme.validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if already registered 
    let user = await req.DB_Scheme.User.findOne({ email: req.body.email });
    if (user) return next({ status: 400, message: 'User Already registered' })

    //create new user 
    const _std = new req.DB_Scheme.User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        profileImg: "Avatar",
        password: req.body.password,
    });
    //encrypting user password 
    const salt = await bcrypt.genSalt(10);
    _std.password = await bcrypt.hash(_std.password, salt);

    //save mapping returned object to the client  
    _std.save().then((result) => {
        res.send(_.pick(result, ['_id', 'firstName', 'lastName', 'email', 'plan', 'cvs']));
    }).catch((err) => {
        next({ status: 500, message: 'Server Error', err: err })
        for (e in err.errors) { console.log(err.errors[e].message) }
    });
}

module.exports = {
    AddNewUser
}