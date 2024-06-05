const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URI)
	} catch (error) {
		console.error(error.message)
	}
}

module.exports = connectDB
