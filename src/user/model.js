const mongoose = require('mongoose');
const { use } = require('./userrouter');
const {userSchema} = require('./userschema');
const bcrypt = require('bcrypt');

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;

}

userSchema.pre('save', async function(req,res,next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

userSchema.methods.isValidPassword = async function(password){
    try {
        return await bcrypt.compare(password,this.password);
    } catch (error) {
        throw error;
    }
}

module.exports = mongoose.model('users',userSchema);