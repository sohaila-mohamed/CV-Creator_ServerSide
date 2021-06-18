const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const { LoginValidation } = require('../database/UserScheme');




async function LoginUser(req, res, next) {
    //validate request body
    const { error } = LoginValidation(req.body);
    if (error) return next({ status: 400, message: error.details[0].message, err: error });
    //check if already registered 
    let user = await req.DB_Scheme.User.findOne({ email: req.body.email });
    if (!user) return next({ status: 400, message: 'Not registered yet' })

    //check if password validation
    const validatePassword = await bcrypt.compare(req.body.password, user.password);
    if (!validatePassword) return next({ status: 400, message: 'Invalid email or password' });

    //generate token
    const token = user.GenerateAuthenticationToken();
    //set response header with the generated token and send the response body mapped
    res.header('x-login-auth-token', token).send(_.pick(user, ['_id', 'firstName', 'lastName', 'email', 'profileImg', 'plan', 'cvs']));

}

module.exports = {
    LoginUser
}