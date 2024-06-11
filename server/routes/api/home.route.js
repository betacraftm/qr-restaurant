const express = require('express')
const router = express.Router()
const restaurantController = require('../../controllers/api/restaurant.controller')
const userController = require('../../controllers/api/user.controller')

router
	.route('/')
	.get(restaurantController.getAllRestaurant)
	.post(restaurantController.createRestaurant)

router
	.route('/:id')
	.put(restaurantController.editRestaurant)
	.delete(restaurantController.deleteRestaurant)

router.route('/setting').put(userController.handleEdit)

module.exports = router
