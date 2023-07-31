const app = require('express')
const router = app.Router()
const {addCat, categorybyname, categorybyid, updatecategory, deletecategory, getAllCategories} = require('./Controller')


//addBrand
router.post('/addcat', addCat)

router.get('/getallcategories', getAllCategories)


router.get('/categorybyname/:catname', categorybyname)

router.get('/categorybyid/:_id', categorybyid)

router.put('/updatecategory/:_id', updatecategory)

router.delete('/deletecategory/:catname', deletecategory)








module.exports = router