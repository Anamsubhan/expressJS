const app = require('express')
const router = app.Router()
const {getAllProducts, addProduct, productbyBrand, productbyCategory, productbyId} = require('./Controller')
//getAllProducts
router.get('/getallproducts', getAllProducts)

//addProducts
router.post('/addproduct', addProduct)

//getproductbyid
router.get('/productbyid', productbyId)



//getproductsbybrand
router.get('/productbybrand', productbyBrand)

//getproductbycategory
router.get('/productbycategory', productbyCategory)





module.exports = router