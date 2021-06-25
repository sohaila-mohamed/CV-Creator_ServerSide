const mongos = require('mongoose');
const Joi = require('joi');
mongos.set('useCreateIndex', true);
const CategoryScheme = new mongos.Schema({

    name: {
        type: String,
        require: true,
        unique: true
    },
    image: {
        type: String
    },
    templates: [{
        type: mongos.Schema.Types.ObjectId,
        ref: "templates",
    }]


});






//convert scheme to class so we can instantiate from it 
const categories = mongos.model("categories", CategoryScheme);

module.exports.categories = categories;