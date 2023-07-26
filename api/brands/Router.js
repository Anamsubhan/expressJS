const app = require('express')
const router = app.Router()
const {addBrand} = require('./Controller')


//addBrand
router.post('/addbrand', addBrand)




module.exports = router