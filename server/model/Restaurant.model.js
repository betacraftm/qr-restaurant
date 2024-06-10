const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 5,
		required: true,
	},
	address: {
		type: String,
		minlength: 5,
		required: true,
	},
	numTable: {
		type: Number,
		min: 0,
		required: true,
	},
	dishes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Dish',
			default: [],
		},
	],
	orders: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Bill',
			default: [],
		},
	],
	description: String,
})

module.exports = mongoose.model('Restaurant', restaurantSchema)
