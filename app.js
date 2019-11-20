// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })

// require express-handlebars here
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(methodOverride('_method'))

// mongoose 連線後透過 mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

//載入
const RestaurantList = require('./models/restaurantList')

// search
app.get('/search', (req, res) => {
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
// //列出所有 restaurants
// app.get('/', (req, res) => {
//   RestaurantList.find((err, restaurants) => {
//     if (err) return console.error(err)
//     return res.render('index', { restaurants: restaurants })
//   })
// })

app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurantList'))

// // 新增一筆 restaurants 頁面
// app.get('/new', (req, res) => {
//   return res.render('new')
// })
// // 顯示一筆 restaurants 的詳細內容
// app.get('/restaurants/:id', (req, res) => {
//   RestaurantList.findById(req.params.id, (err, restaurant) => {
//     if (err) return console.error(err)
//     return res.render('show', { restaurant: restaurant })
//   })
// })
// // 修改 restaurants 頁面
// app.get('/restaurants/:id/edit', (req, res) => {
//   RestaurantList.findById(req.params.id, (err, restaurant) => {
//     if (err) return console.error(err)
//     return res.render('edit', { restaurant: restaurant })
//   })
// })
// // 新增一筆 RestaurantList
// app.post('/new', (req, res) => {
//   const restaurant = new RestaurantList({
//     name: req.body.name,  // name 是從 new 頁面 form 傳過來
//     name_en: req.body.name_en,
//     category: req.body.category,
//     image: req.body.image,
//     location: req.body.location,
//     phone: req.body.phone,
//     google_map: req.body.google_map,
//     rating: req.body.rating,
//     description: req.body.description
//   })
//   restaurant.save(err => {
//     if (err) return console.error(err)
//     return res.redirect('/')  // 新增完成後，將使用者導回首頁
//   })
// })
// // 修改 RestaurantList
// app.put('/restaurants/:id/edit', (req, res) => {
//   RestaurantList.findById(req.params.id, (err, restaurantList) => {
//     if (err) return console.error(err)
//     restaurantList.name = req.body.name
//     restaurantList.save(err => {
//       if (err) return console.error(err)
//       return res.redirect(`/restaurants/${req.params.id}`)
//     })
//   })
// })

// //刪除 restaurants
// app.delete('/restaurants/:id/delete', (req, res) => {
//   RestaurantList.findById(req.params.id, (err, restaurant) => {
//     if (err) return console.error(err)
//     restaurant.remove(err => {
//       if (err) return console.error(err)
//       return res.redirect('/')
//     })
//   })
// })

// start and listen on the Express server
app.listen(port, () => {
  console.log(`App is running`)
})