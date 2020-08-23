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
//const RestaurantList = require('./restaurant.json')

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


app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurantList'))



// start and listen on the Express server
app.listen(port, () => {
  console.log(`App is running`)
})