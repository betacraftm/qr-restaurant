const User = require('../model/User.model')
const { StatusCodes } = require('http-status-codes')

const handleLogout = async (req, res) => {
	try {
		const cookies = req.cookies
		if (!cookies?.jwt) {
			return res.status(StatusCodes.NO_CONTENT).json({})
		}
		const refreshToken = cookies?.jwt
		const foundUser = await User.findOne({ refreshToken })

		if (!foundUser) {
			res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
			return res.status(StatusCodes.NO_CONTENT)
		}

		foundUser.refreshToken = ''
		await foundUser.save()
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
		res.status(StatusCodes.NO_CONTENT).json({})
	} catch (error) {
		console.log(`Error in logout route: ${error.message}`)
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message })
	}
}

module.exports = { handleLogout }
