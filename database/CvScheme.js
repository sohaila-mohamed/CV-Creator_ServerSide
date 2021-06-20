const mongos = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
mongos.set('useCreateIndex', true);
const CvScheme = new mongos.Schema({
    templateId: {
        type: Number,
        required: true,
        min: [100, 'not valid cv id '],
        max: 599,
        unique: true
    },
    data: {
        type: Object,
        default: {}
    }

});

function GenerateCvToken(payload) {
    console.log("......payload", payload);
    return jwt.sign(payload, config.get('Users.Login.JWTPrivateKey'));
}

function validateCV(cv) {
    console.log("cv", cv)
    const schema = Joi.object({

        id: Joi.number().min(100).max(599).required(),
        htmlTemplate: Joi.string().required(),

    });

    return schema.validate(cv);
}


//convert scheme to class so we can instantiate from it 
const Cv = mongos.model("cvs", CvScheme);

module.exports.Cv = Cv;

module.exports.validateCv = validateCV;

module.exports.GenerateCvToken = GenerateCvToken;