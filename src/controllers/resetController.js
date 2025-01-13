import User from "../models/user.js";
import passwordHash from "password-hash";
import * as crypto from 'crypto';

let resetController= {
    forgetPassword: async(req,res)=>{  
        try{
          const user= await User.findOne({ email:req.body.email});
          if(!user){
             return res.status(404).send({message:"user don't exixt"});
            }
               const token= crypto.randomBytes(20).toString('hex');
               const expiration= new Date(Date.now()+ 10*60*1000);
                // console.log(expiration,token);
                user.resetToken= token;
                user.tokenExpiration=expiration;
                // console.log(user.resetToken, user.tokenExpiration);    
        
            await user.save();
            return res.status(200).send({message:"Password reset token sent successfully",user,token});
        }catch(error){

            console.log(error);
            return res.status(400).send({message:"Error generating reset token"});
        }
    },
    resetpassword: async(req,res)=>{
        
        try {
            const {resetToken ,password}=req.body;
            if ( !password || !resetToken) {
                return res.status(403).json({message: "All fields are required" });
            }
            // console.log(resetToken);
                    
            const user =await User.findOne({ resetToken:resetToken, tokenExpiration: { $gt : new Date()}});
            // console.log(user);
            if (!user) {
                // console.log(user);
                
                return res.status(404).send({ message: "Invalid or expired reset token" });
            }
            user.password = passwordHash.generate(password);
            user.resetToken=undefined;
            user.tokenExpiration=undefined;

            return res.status(201).send({ message: "Password reset successful",user });

        } catch (error) {

            console.log(error);
            return res.status(400).send({ message: "error.Password reset Failed." });
        }
    },

};

export default resetController;