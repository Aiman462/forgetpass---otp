import User from "../models/user.js";
import Otp from "../models/otp.js";
import otpGenerator from "otp-generator";
import passwordHash from "password-hash";
import mail from "../utils/otp.js";

const otpController={
    sendOtp: async(req,res)=>{
        try {
            const findUser=await User.findOne({ email:req.body.email});
            if(findUser){
               res.status(400).send({ message: "User already exists" });
            }

            let OTP=otpGenerator.generate(4,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            const generatedOtp= new Otp({email:req.body.email, otp:OTP});
            await generatedOtp.save();

            let result=await Otp.findOne({otp:OTP});
            while(result){
                OTP=otpGenerator.generate(4,{
                    upperCaseAlphabets:false,
                    lowerCaseAlphabets:false,
                    specialChars:false,
                });
                result=await Otp.findOne({otp:OTP});
                generatedOtp.otp = OTP;
                await generatedOtp.save();
            }
            
            // mail(req.body.email,OTP);
            return res.status(200).send({ message: "OTP sent successfully",OTP });
        }catch(error){
           console.log(error);
           return res.status(400).send({ message: "Error" });

        }
    },
    signUp: async(req,res)=>{
        const{username,password,otp,email}= req.body;
        const findUser=await User.findOne({ email:req.body.email});
        if(findUser){
            res.status(400).send({ message: "User already exists" });
        }
        if (!username || !email || !password || !otp) {
            return res.status(403).json({message: "All fields are required" });
        }

        const OTP=await Otp.findOne({email:req.body.email});
       if((Date.now()-new Date(OTP.createdAt).getTime)> 3*60*1000){
         res.status(400).send({ message: "The OTP has expired" });
       }
       
       try { 
         const user = new User(req.body);
         user.password = passwordHash.generate(req.body.password);
         await user.save();
         return res.status(201).send({ message: "User created successfully" ,user});
        } catch (error) {
          console.log(error);
          return res.status(400).send({ message: "Error creating user" ,error});
        }    
    }
}

export default otpController;
