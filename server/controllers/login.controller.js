const bcrypt = require('bcryptjs')
const { StatusCodes } = require('http-status-codes')
const User = require('../model/User.model')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
	const { user, password } = req.body
	if (!user || !password)
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu' })

	const foundUser = await User.findOne({
		$or: [{ userName: user }, { email: user }],
	})

	if (!foundUser)
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ message: 'Tên đăng nhập hoặc email không tồn tại' })

	const match = await bcrypt.compare(password, foundUser.password)

	if (match) {
		const accessToken = jwt.sign(
			{
				UserInfo: {
					userName: foundUser.userName,
					email: foundUser.email,
				},
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '6h' }
		)

		const refreshToken = jwt.sign(
			{
				UserInfo: {
					userName: foundUser.userName,
					email: foundUser.email,
				},
			},
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '7d' }
		)

		foundUser.refreshToken = refreshToken
		const result = await foundUser.save()
		console.log(result)

		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			sameSite: 'None',
			secure: true,
			maxAge: 7 * 24 * 60 * 60 * 1000,
		})
		res.status(StatusCodes.OK).json({ accessToken })
	} else {
		res.status(StatusCodes.UNAUTHORIZED)
	}
}

module.exports = { handleLogin }
