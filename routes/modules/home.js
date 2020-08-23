const express = require('express')
const Restaurant = require('../../models/restaurant')

const router = express.Router()

// show restaurant list
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// search restaurants by the name
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then(restaurants => {
      const restaurantSearched = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
      })
      return res.render('index', { restaurants: restaurantSearched, keyword })
    })
    .catch(error => console.log(error))
})

// sort restaurants
router.get('/sort', (req, res) => {
  const sortMethod = req.query.sortMethod
  const userId = req.user._id
  let sortConfig = {}

  switch (sortMethod) {
    case 'nameAsc':
      sortConfig = { name_en: 'asc' }
      break
    case 'nameDesc':
      sortConfig = { name_en: 'desc' }
      break
    case 'category':
      sortConfig = { category: 'desc' }
      break
    case 'location':
      sortConfig = { location: 'desc' }
      break
    default:
      break
  }

  Restaurant.find({ userId })
    .lean()
    .sort(sortConfig)
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

module.exports = router
