const {Schema, model} =require('mongoose')

const BrandSchema = new Schema({
    brandname : {
        type : String,
        required : true
    }   
    ,
    brandImage : {
        type : String,
        required : true
    }
})


const Brand = model('brand',BrandSchema)
module.exports = Brand