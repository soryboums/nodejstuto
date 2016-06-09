var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the Schema

var dishShema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

// Create a model for a dish

var Dishes = mongoose.model('Dish', dishShema);

// Exports the module
module.exports = Dishes;
