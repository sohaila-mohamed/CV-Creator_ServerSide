const mongos = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
mongos.set('useCreateIndex', true);
const CvScheme = new mongos.Schema({
    id: {
        type: Number,
        required: true,
        min: [100, 'not valid cv id '],
        max: 599
    },
    htmlTemplate: {
        type: String,
        required: true
    }

});



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

module.exports.validate = validateCV;