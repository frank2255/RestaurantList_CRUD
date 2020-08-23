// routes/restaurantList.js
const express = require('express')
const router = express.Router()
const RestaurantList = require('../models/restaurantList')

// search
router.get('/search', (req, res) => {
  RestaurantList.find((err, restaurants) => {
    const keyword = req.query.keyword
    if (err) return console.error(err)
    const Result = restaurants.filter(restaurant => {
      return (
        restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      )
    })
    res.render('index', { keyword: keyword, restaurants: Result })
  })

})
//列出所有 restaurants
router.get('/', (req, res) => {
  RestaurantList.find()
    .sort({ name: 'asc' })
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants: restaurants })
    })
})

// 新增一筆 restaurants 頁面
router.get('/new', (req, res) => {
  return res.render('new')
})
// 顯示一筆 restaurants 的詳細內容
router.get('/:id', (req, res) => {
  RestaurantList.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('show', { restaurant: restaurant })
  })
})
// 修改 restaurants 頁面
router.get('/:id/edit', (req, res) => {
  RestaurantList.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant: restaurant })
  })
})
// 新增一筆 RestaurantList
router.post('/new', (req, res) => {
  const restaurant = new RestaurantList({
    name: req.body.name,  // name 是從 new 頁面 form 傳過來
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  })
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')  // 新增完成後，將使用者導回首頁
  })
})
// 修改 RestaurantList
router.put('/:id/edit', (req, res) => {
  RestaurantList.findById(req.params.id, (err, restaurantList) => {
    if (err) return console.error(err)
    restaurantList.name = req.body.name
    restaurantList.name_en = req.body.name_en
    restaurantList.category = req.body.category
    restaurantList.image = req.body.image
    restaurantList.location = req.body.location
    restaurantList.phone = req.body.phone
    restaurantList.google_map = req.body.google_map
    restaurantList.rating = req.body.rating
    restaurantList.description = req.body.description
    restaurantList.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

//刪除 restaurants
router.delete('/:id/delete', (req, res) => {
  RestaurantList.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

//設定路由
module.exports = router