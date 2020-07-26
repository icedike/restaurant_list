const express = require('express')
const app = express()
const exhbps = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const mongoose = require('mongoose')

const port = 3000

// connect db
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected!')
})


// set template engine
app.engine('handlebars', exhbps({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// set static directory
app.use(express.static('public'))

// show restaurant list
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// show the restaurant
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant })
})

// search restaurants by the name
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
  })
  res.render('index', { restaurants, keyword })
})

app.listen(port, () => {
  console.log('Running server')
})
