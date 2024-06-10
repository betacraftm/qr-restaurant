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

//Connect to database
connectDB()

// Log event
app.use(logger)

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials)

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

//middleware for cookies
app.use(cookieParser())

//routes
app.use('/register', require('./routes/register.route'))
app.use('/login', require('./routes/login.route'))
app.use('/logout', require('./routes/logout.route'))
app.use('/refresh', require('./routes/refresh.route'))
app.use('/menu', require('./routes/api/menu.route'))
app.use(verifyJWT)
app.use('/home', require('./routes/api/home.route'))
app.use('/restaurant', require('./routes/api/restaurant.route'))

app.use(errorHandler)

mongoose.connection.once('open', () => {
	console.log('Connected to DB')
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
