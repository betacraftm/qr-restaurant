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

		if (!fullName || !userName || !email || !password || !confirmPwd) {
			res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Vui lòng điền hết vào tất cả các ô' })
			return
		}

		if (!fullNameReg.test(fullName)) {
			res.status(StatusCodes.BAD_REQUEST).json({ message: 'Tên không hợp lệ' })
			return
		}

		if (!userNameReg.test(userName)) {
			res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Tên đăng nhập không hợp lệ' })
			return
		}

		if (!emailReg.test(email)) {
			res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Email không hợp lệ' })
			return
		}

		if (!passwordReg.test(password)) {
			res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Mật khẩu không hợp lệ' })
			return
		}

		if (password !== confirmPwd) {
			res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: 'Xác nhận mật khẩu sai' })
			return
		}

		const duplicateUserName = await User.findOne({ userName })
		if (duplicateUserName) {
			res
				.status(StatusCodes.CONFLICT)
				.json({ message: 'Tên đăng nhập đã tồn tại' })
			return
		}

		const duplicateEmail = await User.findOne({ email })
		if (duplicateEmail) {
			res
				.status(StatusCodes.CONFLICT)
				.json({ message: 'Email đã được sử dụng' })
			return
		}

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
	} catch (err) {
		console.log(`Error in register routes: ${err.message}`)
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message })
	}
}

module.exports = { handleNewUser }
