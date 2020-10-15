const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const categorySchema = new mongoose.Schema({
    categoryId:{
        type:String,
        required:true
    },
    categoryName:{
        type:String,
        require:true
    },
    isActive:{
        type:Number
    }
},
{
    timestamps:true
})

const categoryValidate = Joi.object({
    categoryName:Joi.string().required(),
    isActive:Joi.boolean()
})

module.exports = {
    categorySchema,
    categoryValidate
}