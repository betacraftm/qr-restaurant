const { StatusCodes } = require('http-status-codes')
const User = require('../../model/User.model')
const Restaurant = require('../../model/Restaurant.model')

const vietnamCharacter =
	'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ'

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
		const nameReg = new RegExp(`^[A-Za-z${vietnamCharacter}\\s\\-]{5,}$`, 'g')
		const addressReg = new RegExp(
			`^[0-9]{1,5}[A-Za-z${vietnamCharacter}\\s.,#\\-]{5,}$`,
			'g'
		)
		const districtReg = new RegExp(
			`^[A-Za-z${vietnamCharacter}0-9\\s\\-]+$`,
			'g'
		)
		const wardReg = new RegExp(`^[A-Za-z${vietnamCharacter}0-9\\s\\-]+$`, 'g')
		const numTableReg = new RegExp(`^\\d+$`, 'g')

		if (!name || !address || !numTable || !district || !ward) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Please fill out all the field' })
		}

		if (!nameReg.test(name)) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Invalid restaurant name' })
		}

		if (!addressReg.test(address)) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Invalid address' })
		}

		if (!numTableReg.test(numTable)) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Invalid number of table' })
		}

		if (!districtReg.test(district)) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Invalid district' })
		}

		if (!wardReg.test(ward)) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Invalid ward' })
		}

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
	} catch (error) {
		console.log(`Error in create restaurant: ${error.message}`)
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message })
	}
}

const editRestaurant = async (req, res) => {
	try {
		if (!req?.params?.id)
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Id are required' })
		const restaurant = await Restaurant.findById(req.params.id)
		if (!restaurant)
			return res
				.status(StatusCodes.NO_CONTENT)
				.json({ message: 'No restaurant matched ID' })
		if (req.body?.name) restaurant.name = req.body.name
		if (req.body?.address) restaurant.address = req.body.address
		if (req.body?.numTable) restaurant.numTable = req.body.numTable
		if (req.body?.description) restaurant.description = req.body.description

		const result = await restaurant.save()
		console.log(result)
		res.status(StatusCodes.OK).json(result)
	} catch (error) {
		console.log(`Error in edit restaurant: ${error.message}`)
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message })
	}
}

const deleteRestaurant = async (req, res) => {
	try {
		if (!req?.params?.id)
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Id are required' })
		await Restaurant.findByIdAndDelete(req.params.id)
		res.status(StatusCodes.OK).json({ message: 'Deleted' })
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
