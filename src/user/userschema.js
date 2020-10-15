const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        index:true,
        lowercase:true
    },
    password:{
        type:String,
        require:true,
    }
},
{
    timestamps:true
});

const userValidate = Joi.object({
    email:Joi.string().email().lowercase().required(),
    password:Joi.string().min(6).max(14).required()
})

module.exports = {
    userValidate,
    userSchema
};
