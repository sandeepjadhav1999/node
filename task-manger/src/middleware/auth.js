const jwt = require('jsonwebtoken')
const User = require('../model/user')


const auth = async (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, 'sandeepJadhav')
        const user = await User.findOne({_id : decode._id, 'tokens.token' : token}) 
        if(!user){
            throw Error("no user found!")
        }
        req.token = token
        req.user = user
        next()
    }
    catch(e){
        res.status(500).send("Please :authenticate")
    }
}

module.exports = auth