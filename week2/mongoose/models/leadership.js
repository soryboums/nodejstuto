var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the Schema

var dishShema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Create a model for a dish

var Dishes = mongoose.model('Leadership', dishShema);

// Exports the module
module.exports = Dishes;
