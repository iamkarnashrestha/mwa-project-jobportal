const {SECRET}=require('../config.json')
const jwt=require('jsonwebtoken')
module.exports.checkToken=async(req,res,next)=>{
   try {
       const authString=req.headers['authorization']
       if(!authString) return next(new Error("Token is required"))
       const jwt_client=authString.split(" ")[1]
       const decoded_token =jwt.verify(jwt_client,SECRET)
       req.token=decoded_token
       next()
   } catch (error) {
       next(error)
    }
}