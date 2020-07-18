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

app.get('/', (req, res) => {
  console.log(restaurantList.results)
  res.render('index', { restaurants: restaurantList.results })
})

app.listen(port, () => {
  console.log('Running server')
})
