const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const productSchema = new mongoose.Schema({
    productId:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        require:true
    },
    categoryId:{
        type:String,
        required:true
    },
    categoryName:{
        type:String,
        required:true
    },
    isActive:{
        type:Number
    }
},
{
    timestamps:true
})

const productValidate = Joi.object({
    categoryId:Joi.string().required(),
    productName:Joi.string().required(),
    isActive:Joi.boolean()
})

module.exports = {
    productSchema,
    productValidate
}