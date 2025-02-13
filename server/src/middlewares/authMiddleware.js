const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer ")){
        token = authHeader.split(" ")[1];
    }
    if(!token){
        return res.status(401).json({message: "No token provided, Authorization denied"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("The decoded user is",decoded);
        next();
    }catch(e){
        res.status(401).json({message: "Unauthorized"});
    }

}   

module.exports = authMiddleware;