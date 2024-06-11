const Restaurant = require('../../model/Restaurant.model')
const { StatusCodes } = require('http-status-codes')
const Bill = require('../../model/Bill.model')

const getMenu = async (req, res) => {
	try {
		const { table } = req.query
		if (table <= 0)
			res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Table number must be positive' })
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

		res
			.status(StatusCodes.OK)
			.json({ name: restaurant.name, table, dishes: restaurant.dishes })
	} catch (error) {
		console.log(`Error in get menu: ${error.message}`)
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message })
	}
}

const getOrder = async (req, res) => {
	try {
		const { table } = req.query
		if (table <= 0)
			res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Table number must be positive' })
		const { dishes, totalPrice } = req.body
		if (!dishes && totalPrice < 0)
			res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Must have dish in order' })
		const result = await Bill.create({
			table,
			dishes,
			totalPrice,
		})

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

		const oldOrder = restaurant.orders
		restaurant.orders = [...oldOrder, result._id]
		await restaurant.save()
		res
			.status(StatusCodes.CREATED)
			.json({ message: `Order ${result._id} created` })
	} catch (error) {
		console.log(`Error in get order: ${error.message}`)
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message })
	}
}

module.exports = { getMenu, getOrder }
