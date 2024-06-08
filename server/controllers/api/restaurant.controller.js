const { StatusCodes } = require('http-status-codes')
const User = require('../../model/User.model')
const Restaurant = require('../../model/Restaurant.model')

const getAllRestaurant = async (req, res) => {
	try {
		const userId = req.body?._id
		if (!userId)
			return res
				.status(StatusCodes.FORBIDDEN)
				.json({ message: 'Vui lòng cung cấp ID' })
		const foundUser = await User.findById(userId).populate('restaurants')
		if (!foundUser)
			return res
				.status(StatusCodes.FORBIDDEN)
				.json({ message: 'User không tồn tại' })
		const restaurants = foundUser.restaurants
		res.status(StatusCodes.OK).json(restaurants)
	} catch (error) {
		console.log(`Error in get all restaurant: ${error.message}`)
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message })
	}
}

const createRestaurant = async (req, res) => {
	try {
		const userId = req.body?._id
		if (!userId)
			return res
				.status(StatusCodes.FORBIDDEN)
				.json({ message: 'Vui lòng cung cấp ID' })
		const foundUser = await User.findById(userId)
		if (!foundUser)
			return res
				.status(StatusCodes.FORBIDDEN)
				.json({ message: 'User không tồn tại' })
		const { name, address, numTable, description } = req.body
		// REGEX here
		const result = await Restaurant.create({
			name,
			address,
			numTable,
			description,
		})
		const oldRestaurant = foundUser.restaurants
		foundUser.restaurants = [...oldRestaurant, result._id]
		await foundUser.save()
		res
			.status(StatusCodes.CREATED)
			.json({ message: `New restaurant ${name} created` })
	} catch (error) {
		console.log(`Error in create restaurant: ${error.message}`)
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message })
	}
}

module.exports = { getAllRestaurant, createRestaurant }
