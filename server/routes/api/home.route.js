const express = require('express')
const router = express.Router()
const restaurantController = require('../../controllers/api/restaurant.controller')

router.route('/').get(restaurantController.getAllRestaurant)

module.exports = router
