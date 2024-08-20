const mongoose = require('mongoose')

const dishSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
	category: [
		{
			type: String,
			default: [],
			minlength: 3,
		},
	],
	description: String,
	imageUrl: String,
})

module.exports = mongoose.model('Dish', dishSchema)
