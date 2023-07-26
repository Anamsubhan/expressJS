const app = require('express')
const router =app.Router()

const {login, signup} = require('./Controller')

router.post('/signup', signup )

  router.post('/login' , login)





  module.exports = router