var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency

// Create the Schema
var promoShema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        defaults: ''
    },
    price: {
        type : Currency,
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

var Dishes = mongoose.model('Promotion', promoShema);

// Exports the module
module.exports = Dishes;
