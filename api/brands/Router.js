const app = require('express')
const router = app.Router()
const {addBrand, brandbyname, brandbyid, updatebrand, deletebrand} = require('./Controller')


//addBrand
router.post('/addbrand', addBrand)

router.get('/brandbyname/:brandname', brandbyname)

router.get('/brandbyid/:_id', brandbyid)

router.put('/updatebrand/:_id', updatebrand)

router.delete('/deletebrand/:brandname', deletebrand)









module.exports = router