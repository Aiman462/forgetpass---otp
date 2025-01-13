import token from "../utils/token.js";

const authentication= async (req, res) => {
    
    const Token = req.headers.authorization;
    if (!Token) {
        return res.status(401).send({ message: "Access denied.No token provided" });
    }
    const bearerToken = Token.split(' ')[1];
    try {
        const decode =  token.verifyToken(bearerToken, process.env.JWT_SECRET);
        console.log(decode);
        
        return res.status(200).send({ message: "token validated!" });
    } catch (error) {
        return res.status(401).send({ message: "Invalid token" });
    }
};

export default authentication;