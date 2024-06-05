const express = require('express')
const dotenv = require('dotenv')
const app = express()

dotenv.config()

const PORT = process.env.PORT || 1010

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.listen(8904, () => console.log(`Server is running on port ${PORT}`))
