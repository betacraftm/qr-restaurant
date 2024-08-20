const { StatusCodes } = require('http-status-codes')

const vietnamCharacter =
	'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ'

const restaurantRegex = (name, address, district, ward, numTable, res) => {
	const nameReg = new RegExp(`^[A-Za-z${vietnamCharacter}0-9\\s\\-]{5,}$`, 'g')
	const addressReg = new RegExp(
		`^[0-9]{1,5}[A-Za-z${vietnamCharacter}\\s.,#\\-]{5,}$`,
		'g'
	)
	const districtReg = new RegExp(`^[A-Za-z${vietnamCharacter}0-9\\s\\-]+$`, 'g')
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
		return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid ward' })
	}

	return false
}

module.exports = { restaurantRegex }
