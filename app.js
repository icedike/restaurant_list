const express = require('express')
const app = express()
const exhbps = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')

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

// set body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// set template engine
app.engine('handlebars', exhbps({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// set static directory
app.use(express.static('public'))

// show restaurant list
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// show the restaurant
app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// search restaurants by the name
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const restaurantSearched = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
      })
      return res.render('index', { restaurants: restaurantSearched, keyword })
    })
    .catch(error => console.log(error))
})

// edit restaurant page
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  const newRestaurant = req.body
  Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = newRestaurant.name
      restaurant.name_en = newRestaurant.name_en
      restaurant.category = newRestaurant.category
      restaurant.location = newRestaurant.location
      restaurant.phone = newRestaurant.phone
      restaurant.google_map = newRestaurant.google_map
      restaurant.rating = newRestaurant.rating
      restaurant.description = newRestaurant.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log('Running server')
})
