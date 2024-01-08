const jwt = require('jsonwebtoken');
const validateUser = async(req,res,next)=>{
const token = req?.headers?.authorization;
const decoded = jwt?.decode(token?.split('Bearer ')[1])
if(decoded?.id){
    next()
    return;
}else{
    return res.status(401).json('User Not Verified')
}
}

module.exports = validateUser