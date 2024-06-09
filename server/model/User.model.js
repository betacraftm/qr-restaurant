const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
		minLength: 2,
	},
	userName: {
		type: String,
		required: true,
		unique: true,
		minLength: 3,
	},
	password: {
		type: String,
		minLength: 8,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	restaurants: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Restaurant',
			default: [],
		},
	],
	refreshToken: String,
})

module.exports = mongoose.model('User', userSchema)
