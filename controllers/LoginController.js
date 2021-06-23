const bcrypt = require('bcrypt');
const _ = require('lodash');
const { LoginValidation } = require('../database/UserScheme');
const { generateSessionToken } = require('./SessionAuthController');



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
    //generate session id 
    const sessionId = generateSessionToken();
    //set response header with the generated token and send the response body mapped
    res.append('x-login-auth-token', token);
    res.send(_.pick(user, ['_id', 'firstName', 'lastName', 'email', 'profileImg', 'plan', 'cvs']));

}

module.exports = {
    LoginUser
}