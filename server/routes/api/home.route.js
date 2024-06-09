const express = require('express')
const router = express.Router()
const restaurantController = require('../../controllers/api/restaurant.controller')

router
	.route('/')
	.get(restaurantController.getAllRestaurant)
	.post(restaurantController.createRestaurant)

router
	.route('/:id')
	.put(restaurantController.editRestaurant)
	.delete(restaurantController.deleteRestaurant)

module.exports = router
