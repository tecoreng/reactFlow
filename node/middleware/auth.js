const jwt  = require('jsonwebtoken')
const customersModel = new (require('../Models/v1/customers'))();

const authenticate = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '').trim()
        const decoded  =  jwt.verify(token, process.env.JWT_SECRET)
        console.log(token)
        const user  = await customersModel.getCustomer(decoded._id)
        
        if(!user){
            throw new Error()
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({error:'Please authenticate!'})
    }
}


// Verify Admin
const verifyAdmin = async (req, res, next) =>{
    await authenticate(req,res,()=>{
        if(req.user.role == 0){
            next();
        }else{
            res.status(403).json("Invalid Access!!");
        }
    });
}; 
  
  // Verify Customer
  const verifyCustomer = async (req, res, next) =>{
      await authenticate(req,res,()=>{
          if(req.user.role == 1){
              next();
            }else{
                res.status(403).json("Invalid Access!!");
            }
        });
    }; 
  
module.exports = {authenticate, verifyAdmin, verifyCustomer }
  
