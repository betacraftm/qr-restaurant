const { StatusCodes } = require('http-status-codes')
const Restaurant = require('../../model/Restaurant.model')
const Dish = require('../../model/Dish.model')
const { dishRegex } = require('../../utils/dishRegex.utils.js')

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
		const { name, price, category, description, imageUrl } = req.body

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

		if (!dishRegex(name, price, category, res)) {
			const result = await Dish.create({
				name,
				price,
				category,
				description,
				imageUrl:
					imageUrl === ''
						? 'https://www.bbcgoodfood.com/recipes/collection/easy-recipes'
						: imageUrl,
			})
			const dishes = restaurant.dishes
			restaurant.dishes = [...dishes, result._id]
			await restaurant.save()
			res.status(StatusCodes.CREATED).json(result)
		}
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
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'No dish matched ID' })
		const { name, price, category, description, imageUrl } = req.body
		if (!dishRegex(name, price, category, description, imageUrl, res)) {
			foundDish.name = name
			foundDish.price = price
			foundDish.category = category
			foundDish.description = description
			foundDish.imageUrl =
				imageUrl === ''
					? 'https://www.bbcgoodfood.com/recipes/collection/easy-recipes'
					: imageUrl
			const result = await foundDish.save()
			res.status(StatusCodes.OK).json(result)
		}
	} catch (error) {
		console.log(`Error in edit dishes: ${error.message}`)
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message })
	}
}

const deleteDish = async (req, res) => {
	try {
		const { dish } = req.query
		await Dish.findByIdAndDelete(dish)
		res.status(StatusCodes.OK).json({ message: 'Deleted' })
	} catch (error) {
		console.log(`Error in delete dishes: ${error.message}`)
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message })
	}
}

module.exports = { getAllDishes, createDish, editDish, deleteDish }
