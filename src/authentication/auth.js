const jwt = require('jsonwebtoken');
const errorCreate =require('http-errors');

const sign = async (id) =>{
    const payload = {
        id
    }

    const secretkey = process.env.secret;
    const options = {
        expiresIn:'24h',
        issuer:'nimapinfotech.com'
    }

    const token = jwt.sign(payload,secretkey,options);
    return token;
}

const verify = async(req,res,next) => {
   
    if(!req.headers['authorization']) return next(errorCreate.Unauthorized());
    const header = req.headers['authorization'];
    const token = header.split(' ')[1];
    const ismatch = await jwt.verify(token,process.env.secret,(error,payload) => {
        if(error) return next(errorCreate.Unauthorized());
        req.payload = payload;
        next();
    })
}

module.exports = {
    sign,
    verify
}