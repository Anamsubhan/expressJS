const app = require('express')
const router = app.Router()
const {getAllProducts, addProduct, productbyBrand, productbyCategory, productbyId, updateproduct, deleteproduct} = require('./Controller')
//getAllProducts
router.get('/getallproducts', getAllProducts)

//addProducts
router.post('/addproduct', addProduct)

//getproductbyid
router.get('/productbyid/:_id', productbyId)

//getproductsbybrand
router.get('/productbybrand/:brandname', productbyBrand)

//getproductbycategory
router.get('/productbycategory/:catname', productbyCategory)

router.put('/updateproduct/:_id', updateproduct)

router.delete('/deleteproduct/:title', deleteproduct)





module.exports = router