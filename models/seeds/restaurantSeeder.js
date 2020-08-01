const mongoose = require('mongoose')
const { results } = require('./restaurant.json')
const Restaurant = require('../restaurant') // 載入 restaurant model

const restaurantData = results
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  restaurantData.forEach(data => Restaurant.create(data))
  console.log('Done')
})
