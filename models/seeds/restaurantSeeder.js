const { results } = require('./restaurant.json')
const Restaurant = require('../restaurant') // 載入 restaurant model

const db = require('../../config/mongoose')

const restaurantData = results

db.once('open', () => {
  restaurantData.forEach(data => Restaurant.create(data))
  console.log('Done')
})
