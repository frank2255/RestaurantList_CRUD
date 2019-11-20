// routes/home.js
const express = require('express')
const router = express.Router()
const RestaurantList = require('../models/restaurantList')
// 設定首頁路由器

// search
router.get('/', (req, res) => {
  RestaurantList.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })
  })
})
module.exports = router