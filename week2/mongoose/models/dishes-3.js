var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Create a comment schema
var commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});
// Create the dishes Schema
var dishShema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema]
}, {
    timestamps: true
});

// Create a model for a dish

var Dishes = mongoose.model('Dish', dishShema);

// Exports the module
module.exports = Dishes;
