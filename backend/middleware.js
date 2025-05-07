const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next)=>{
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(403).json({
            message : "Invalid"
        })
    }
    const token = authorization.split(' ')[1]
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        if(decoded.userId){
            req.userId = decoded.userId
            next();
        }
        else{
            return res.status(403).json({
                message : "Invalid user"
            })
        }
    }
    catch(err){
        console.error(err);
        return res.status(403).json({
            message : "Invalid user"
        })
    }
}
module.exports= {
    authMiddleware
};