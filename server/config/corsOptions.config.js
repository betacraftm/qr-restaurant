const allowedOrigins = require('./allowedOrigins.config')
const { StatusCodes } = require('http-status-codes')

const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	optionsSuccessStatus: StatusCodes.OK,
}

module.exports = corsOptions
