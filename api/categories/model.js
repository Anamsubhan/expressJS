const {Schema, model} =require('mongoose')

const CatSchema = new Schema({
    catname : {
        type : String,
        required : true,
    }   
})


const category = model('category',CatSchema)
module.exports = category