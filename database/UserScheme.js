const mongos = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const { CvScheme } = require('./CvScheme');
mongos.set('useCreateIndex', true);
const userScheme = new mongos.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    profileImg: {
        type: String
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 1024
    },
    plan: {
        type: Number,
        default: 0
    },
    cvs: {
        type: [String],

    }

});

//for consistent authentication token generation
userScheme.methods.GenerateAuthenticationToken = function() {
    return jwt.sign({ _id: this._id }, config.get('Users.Login.JWTPrivateKey'));
}


function validateUser(user) {
    console.log("user", user)
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        profileImg: Joi.string(),
        password: Joi.string().min(5).max(255).required(),
        plan: Joi.number().default(0),
        cvs: Joi.array().items(
            Joi.object({
                id: Joi.number(),
                htmlTemplate: Joi.string()
            })
        ).default([]).has(Joi.object({ id: Joi.number().min(100).max(599).required(), htmlTemplate: Joi.string().required() }))
    });

    return schema.validate(user);
}

LoginValidation = function(data) {
        const schema = Joi.object({
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(5).max(255).required()
        });

        return schema.validate(data);
    }
    //convert scheme to class so we can instantiate from it 
const User = mongos.model("users", userScheme);



module.exports.User = User;

module.exports.validate = validateUser;

module.exports.LoginValidation = LoginValidation;