import jwt from "jsonwebtoken";

const createToken = (payload,secretKey,options)=>{return jwt.sign(payload,secretKey,options)};

const verifyToken = (token, secretKey) =>{return jwt.verify( token, secretKey)};

export default {createToken,verifyToken};