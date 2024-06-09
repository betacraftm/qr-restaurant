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
const editDish = async (req, res) => {
	try {
		const { dish } = req.query
		const foundDish = await Dish.findById(dish)
		if (!foundDish)
			return res
				.status(StatusCodes.NO_CONTENT)
				.json({ message: 'No dish matched ID' })
		if (req.body?.name) foundDish.name = req.body.name
		if (req.body?.price) foundDish.address = req.body.price
		if (req.body?.category) foundDish.numTable = req.body.category
		if (req.body?.description) foundDish.description = req.body.description
		const result = await foundDish.save()
		console.log(result)
		res.status(StatusCodes.OK).json(result)
	} catch (error) {
		console.log(`Error in edit dishes: ${error.message}`)
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message })
	}
}

module.exports = { getAllDishes, createDish, editDish }
