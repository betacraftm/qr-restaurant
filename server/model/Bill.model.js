const mongoose = require('mongoose')

const billSchema = mongoose.Schema(
	{
		table: {
			type: Number,
			require: true,
			min: 0,
		},
		dishes: [
			{
				dish: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Dish',
				},
				quantity: {
					type: Number,
					min: 1,
				},
			},
		],
		totalPrice: {
			type: Number,
			require: true,
			min: 0,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Bill', billSchema)
