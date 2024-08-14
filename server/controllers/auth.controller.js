const User = require('../model/User.model')
const bcrypt = require('bcryptjs')
const { StatusCodes } = require('http-status-codes')

const handleNewUser = async (req, res) => {
	try {
		const { fullName, userName, email, password, confirmPwd } = req.body
		const fullNameReg = /^[a-zA-Z ]{2,50}$/g
		const userNameReg = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]{3,30}(?<![_.])$/g
		const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g
		const passwordReg =
			/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,64}$/g

		if (!fullName || !userName || !email || !password || !confirmPwd)
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Please fill out all the field' })

		if (!fullNameReg.test(fullName))
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Invalid fullname' })

		if (!userNameReg.test(userName))
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Invalid username' })

		if (!emailReg.test(email))
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Invalid email' })

		if (!passwordReg.test(password))
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Invalid password' })

		if (password !== confirmPwd)
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Confirm password is wrong' })

		const duplicateUserName = await User.findOne({ userName })
		if (duplicateUserName)
			return res
				.status(StatusCodes.CONFLICT)
				.json({ message: 'Username has been taken' })

		const duplicateEmail = await User.findOne({ email })
		if (duplicateEmail)
			return res
				.status(StatusCodes.CONFLICT)
				.json({ message: 'Email has been taken' })

		const hashedPwd = await bcrypt.hash(password, 10)
		const newUser = await User.create({
			fullName,
			userName,
			email,
			password: hashedPwd,
		})
		res.status(StatusCodes.CREATED).json(newUser)
	} catch (error) {
		console.log(`Error in register routes: ${error.message}`)
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message })
	}
}

const handleLogin = async (req, res) => {
	try {
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
						_id: foundUser._id,
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
						_id: foundUser._id,
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
	} catch (error) {
		console.log(`Error in login route: ${error.message}`)
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message })
	}
}

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

module.exports = { handleNewUser, handleLogin, handleLogout, handleRefresh }
