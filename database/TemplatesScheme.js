const mongos = require('mongoose');
const Joi = require('joi');
mongos.set('useCreateIndex', true);
const TemplateScheme = new mongos.Schema({
    templateId: {
        type: Number,
        required: true,
        min: [100, 'not valid cv id '],
        max: 599,
        unique: true
    },
    data: {
        type: Object,
        require: true
    },
    image: {
        type: String
    }


});



function validateTemplate(temp) {
    console.log("template", temp)
    const schema = Joi.object({

        id: Joi.number().min(100).max(599).required(),
        image: Joi.string(),
        date: Joi.object().required()

    });

    return schema.validate(temp);
}


//convert scheme to class so we can instantiate from it 
const Templates = mongos.model("templates", TemplateScheme);

module.exports.templates = Templates;

module.exports.validateCv = validateTemplate;