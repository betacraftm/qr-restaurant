const { StatusCodes } = require('http-status-codes')

const vietnamCharacter =
	'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ'

const dishRegex = (name, price, category, imageUrl, res) => {
	const nameReg = new RegExp(`^[A-Za-z${vietnamCharacter}0-9\\s\\-]{2,}$`, 'g')
	const priceReg = new RegExp(`^\\d+$`, 'g')
	const categoryReg = new RegExp(`^[A-Za-z${vietnamCharacter}\\s\\-]{2,}$`, 'g')

	if (!name || !price || !category) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: 'Please fill out all the field' })
	}

	if (!nameReg.test(name)) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: 'Invalid dish name' })
	}

	if (!priceReg.test(price)) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: 'Invalid price' })
	}

	if (!categoryReg.test(category)) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: 'Invalid category' })
	}

	return false
}

module.exports = { dishRegex }
