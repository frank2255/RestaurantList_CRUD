const mongoose = require('mongoose')
const Todo = require('../restaurantList')
const restaurantList = require('../../restaurant.json')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected!')

  let restaurantresults = restaurantList.results
  for (var i = 0; i < restaurantresults.length; i++) {
    Todo.create({
      name: restaurantresults[i].name,
      name_en: restaurantresults[i].name_en,
      category: restaurantresults[i].category,
      image: restaurantresults[i].image,
      location: restaurantresults[i].location,
      phone: restaurantresults[i].phone,
      google_map: restaurantresults[i].google_map,
      rating: restaurantresults[i].rating,
      description: restaurantresults[i].description
    })
  }
  console.log('restaurantLists are created!')
})

