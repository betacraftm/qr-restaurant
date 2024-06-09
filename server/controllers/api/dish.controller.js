const { StatusCodes } = require('http-status-codes')
const Restaurant = require('../../model/Restaurant.model')
const Dish = require('../../model/Dish.model')

const getAllDishes = async (req, res) => {
	try {
		if (!req?.params?.id)
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Id are required' })
		const restaurant = await Restaurant.findById(req.params.id).populate(
			'dishes'
		)
		if (!restaurant)
			return res
				.status(StatusCodes.NO_CONTENT)
				.json({ message: 'No restaurant matched ID' })

		const dishes = restaurant.dishes
		res.status(StatusCodes.OK).json(dishes)
	} catch (error) {
		console.log(`Error in get all dishes: ${error.message}`)
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message })
	}
}
const createDish = async (req, res) => {
	try {
		const { name, price, category, description } = req.body

		if (!req?.params?.id)
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Id are required' })
		const restaurant = await Restaurant.findById(req.params.id).populate(
			'dishes'
		)
		if (!restaurant)
			return res
				.status(StatusCodes.NO_CONTENT)
				.json({ message: 'No restaurant matched ID' })

		const result = await Dish.create({
			name,
			price,
			category,
			description,
		})
		const dishes = restaurant.dishes
		restaurant.dishes = [...dishes, result._id]
		await restaurant.save()
		res
			.status(StatusCodes.CREATED)
			.json({ message: `New dish ${name} created` })
	} catch (error) {
		console.log(`Error in create dishes: ${error.message}`)
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message })
	}
}
const editDish = async (req, res) => {}

module.exports = { getAllDishes, createDish, editDish }
