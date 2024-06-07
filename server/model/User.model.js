const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
		minlength: 2,
	},
	userName: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
	},
	password: {
		type: String,
		minlength: 8,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	refreshToken: String,
})

module.exports = mongoose.model('User', userSchema)
