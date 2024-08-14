const express = require('express')
const app = express()
const dotenv = require('dotenv')
const { logger } = require('./middleware/logEvent.middleware')
const credentials = require('./middleware/credentials.middleware')
const verifyJWT = require('./middleware/verifyJWT.middleware')
const cors = require('cors')
const corsOptions = require('./config/corsOptions.config')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/errorHandler.middleware')
const connectDB = require('./config/db.config')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 1010
dotenv.config()

connectDB()
app.use(logger)
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', require('./routes/auth.route'))
app.use('api/menu', require('./routes/api/menu.route'))
app.use(verifyJWT)
app.use('api/home', require('./routes/api/home.route'))
app.use('api/restaurant', require('./routes/api/restaurant.route'))
app.use(errorHandler)

mongoose.connection.once('open', () => {
	console.log('Connected to DB')
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
