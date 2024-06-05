const { logEvents } = require('./logEvent.middleware')
const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
	logEvents(`${err.name}: ${err.message}`, 'errLog.txt')
	console.error(err.stack)
	res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message)
}

module.exports = errorHandler
