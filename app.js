const express = require('express')
const app = express()
const exhbps = require('express-handlebars')

const port = 3000

// Set template engine
app.engine('handlebars', exhbps({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// set static directory
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log('Running server')
})
