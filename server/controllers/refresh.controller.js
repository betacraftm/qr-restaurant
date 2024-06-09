const User = require('../model/User.model')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')

const handleRefresh = async (req, res) => {
	try {
		const cookies = req.cookies
		if (!cookies?.jwt) return res.status(StatusCodes.UNAUTHORIZED).json({})
		const refreshToken = cookies.jwt
		const foundUser = await User.findOne({ refreshToken })
		if (!foundUser) return res.status(StatusCodes.FORBIDDEN).json({})
		console.log('test')

		jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			(error, decoded) => {
				if (
					error ||
					decoded.UserInfo.userName !== foundUser.userName ||
					decoded.UserInfo.email !== foundUser.email
				)
					return res.status(StatusCodes.FORBIDDEN).json({})
				const accessToken = jwt.sign(
					{
						UserInfo: {
							_id: foundUser._id,
							userName: foundUser.userName,
							email: foundUser.email,
						},
					},
					process.env.ACCESS_TOKEN_SECRET,
					{ expiresIn: '6h' }
				)

				res.json({ accessToken })
			}
		)
	} catch (error) {
		console.log(`Error in refresh route: ${error.message}`)
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message })
	}
}

module.exports = { handleRefresh }
