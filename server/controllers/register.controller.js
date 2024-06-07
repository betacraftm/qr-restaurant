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
				.json({ message: 'Vui lòng điền hết vào tất cả các ô' })

		if (!fullNameReg.test(fullName))
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Tên không hợp lệ' })

		if (!userNameReg.test(userName))
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Tên đăng nhập không hợp lệ' })

		if (!emailReg.test(email))
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Email không hợp lệ' })

		if (!passwordReg.test(password))
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Mật khẩu không hợp lệ' })

		if (password !== confirmPwd)
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Xác nhận mật khẩu sai' })

		const duplicateUserName = await User.findOne({ userName })
		if (duplicateUserName)
			return res
				.status(StatusCodes.CONFLICT)
				.json({ message: 'Tên đăng nhập đã tồn tại' })

		const duplicateEmail = await User.findOne({ email })
		if (duplicateEmail)
			return res
				.status(StatusCodes.CONFLICT)
				.json({ message: 'Email đã được sử dụng' })

		const hashedPwd = await bcrypt.hash(password, 10)
		const newUser = User.create({
			fullName,
			userName,
			email,
			password: hashedPwd,
		})
		console.log(newUser)
		res
			.status(StatusCodes.CREATED)
			.json({ success: `User ${fullName} created` })
	} catch (error) {
		console.log(`Error in register routes: ${error.message}`)
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error.message })
	}
}

module.exports = { handleNewUser }
