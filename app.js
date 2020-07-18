const express = require('express')
const app = express()
const exhbps = require('express-handlebars')
const restaurantList = require('./restaurant.json')

const port = 3000

// Set template engine
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
  const restaurants = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', { restaurants, keyword })
})

app.listen(port, () => {
  console.log('Running server')
})
