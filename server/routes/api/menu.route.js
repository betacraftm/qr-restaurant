const express = require('express')
const router = express.Router()
const menuController = require('../../controllers/api/menu.controller')

router.route('/:id').get(menuController.getMenu).post(menuController.getOrder)

module.exports = router
