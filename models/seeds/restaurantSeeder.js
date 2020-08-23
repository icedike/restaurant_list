const { results } = require('./restaurant.json')
const Restaurant = require('../restaurant')
const User = require('../user')
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

const restaurantData = results
const SEED_USER = [{
  name: 'User1',
  email: 'user1@example.com',
  password: '12345678'
},
{
  name: 'User2',
  email: 'user2@example.com',
  password: '12345678'
}
]

db.once('open', async () => {
  for (let i = 0; i < 2; i++) {
    await bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
      .then(hash => User.create({
        name: SEED_USER[i].name,
        email: SEED_USER[i].email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        return Promise.all(Array.from(
          { length: 3 },
          (_, j) => {
            return Restaurant.create(Object.assign(restaurantData[j + i * 3], { userId }))
          }
        ))
      })
      .then(() => {
        console.log(`User${i + 1} done!`)
      })
      .catch(error => console.log(error))
  }
  process.exit()
})
