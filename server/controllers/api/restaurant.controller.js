const { StatusCodes } = require('http-status-codes')
const User = require('../../model/User.model')

const getAllRestaurant = async (req, res) => {
	try {
		const userId = req.body?._id
		if (!userId)
			return res.status(StatusCodes.FORBIDDEN).json('Vui lòng cung cấp ID')
		const foundUser = User.findOne({ _id: userId })
		if (!foundUser)
			return res.status(StatusCodes.FORBIDDEN).json('User không tồn tại')
		const restaurants = foundUser.restaurants
		res.status(StatusCodes.OK).json({ restaurants })
	} catch (error) {
		console.log(`Error in get all restaurant: ${error.message}`)
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message })
	}
}

module.exports = { getAllRestaurant }
