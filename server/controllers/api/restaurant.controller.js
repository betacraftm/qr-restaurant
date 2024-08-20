const { StatusCodes } = require('http-status-codes')
const User = require('../../model/User.model')
const Restaurant = require('../../model/Restaurant.model')
const { restaurantRegex } = require('../../utils/restaurantRegex.utils.js')

const getAllRestaurant = async (req, res) => {
	try {
		const userId = req.params?.userId
		if (!userId)
			return res
				.status(StatusCodes.FORBIDDEN)
				.json({ message: 'Please provide ID' })
		const foundUser = await User.findById(userId).populate('restaurants')
		if (!foundUser)
			return res
				.status(StatusCodes.FORBIDDEN)
				.json({ message: 'User does not exsist' })
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
		const userId = req.params?.userId
		if (!userId)
			return res
				.status(StatusCodes.FORBIDDEN)
				.json({ message: 'Please provide ID' })
		const foundUser = await User.findById(userId)
		if (!foundUser)
			return res
				.status(StatusCodes.FORBIDDEN)
				.json({ message: 'User does not exsist' })
		// REGEX here
		const { name, address, district, ward, numTable, description } = req.body
		if (!restaurantRegex(name, address, district, ward, numTable, res)) {
			const result = await Restaurant.create({
				name,
				address,
				ward,
				district,
				numTable,
				description,
			})
			const restaurants = foundUser.restaurants
			foundUser.restaurants = [...restaurants, result._id]
			await foundUser.save()
			res.status(StatusCodes.CREATED).json(result)
		}
	} catch (error) {
		console.log(`Error in create restaurant: ${error.message}`)
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message })
	}
}

const editRestaurant = async (req, res) => {
	try {
		const restaurantId = req.params?.restaurantId
		if (!restaurantId)
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Id are required' })
		const restaurant = await Restaurant.findById(restaurantId)
		if (!restaurant)
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'No restaurant matched ID' })
		const { name, address, district, ward, numTable, description } = req.body

		if (!restaurantRegex(name, address, district, ward, numTable, res)) {
			restaurant.name = name
			restaurant.address = address
			restaurant.district = district
			restaurant.ward = ward
			restaurant.numTable = numTable
			restaurant.description = description
			const result = await restaurant.save()
			res.status(StatusCodes.OK).json(result)
		}
	} catch (error) {
		console.log(`Error in edit restaurant: ${error.message}`)
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message })
	}
}

const deleteRestaurant = async (req, res) => {
	try {
		const restaurantId = req.params?.restaurantId
		if (!restaurantId)
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Id are required' })
		await Restaurant.findByIdAndDelete(restaurantId)
		res.status(StatusCodes.OK).json({ message: 'Restaurant deleted' })
	} catch (error) {
		console.log(`Error in delete restaurant: ${error.message}`)
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message })
	}
}

module.exports = {
	getAllRestaurant,
	createRestaurant,
	editRestaurant,
	deleteRestaurant,
}
