const app = require('express')
const router = app.Router()
const {addCat} = require('./Controller')


//addBrand
router.post('/addcat', addCat)




module.exports = router