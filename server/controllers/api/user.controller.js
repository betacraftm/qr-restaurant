const User = require('../../model/User.model')
const { StatusCodes } = require('http-status-codes')

const handleEdit = async (req, res) => {
	const userId = req.body?._id
	if (!userId)
		return res
			.status(StatusCodes.FORBIDDEN)
			.json({ message: 'Vui lòng cung cấp ID' })
	const foundUser = await User.findById(userId)
	res.status(StatusCodes.OK).json(foundUser)
}

module.exports = { handleEdit }
