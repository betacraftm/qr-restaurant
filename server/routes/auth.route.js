const express = require('express')
const router = express.Router()
const {
	handleNewUser,
	handleLogin,
	handleLogout,
	handleRefresh,
} = require('../controllers/auth.controller.js')

router.post('/register', handleNewUser)
router.post('/login', handleLogin)
router.get('/logout', handleLogout)
router.get('/refresh-token', handleRefresh)

module.exports = router
