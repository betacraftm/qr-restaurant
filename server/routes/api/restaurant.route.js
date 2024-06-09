const express = require('express')
const router = express.Router()
const dishController = require('../../controllers/api/dish.controller')

router
	.route('/:id')
	.get(dishController.getAllDishes)
	.post(dishController.createDish)

module.exports = router
