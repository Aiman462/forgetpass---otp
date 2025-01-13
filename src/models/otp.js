import mongoose from "mongoose";
import mail from "../utils/otp.js";

const otpSchema= new mongoose.Schema({

    email:{ type:String , required: true , match: /\S+@\S+\.\S+/ },
    otp:{type:Number, required:true},
    createdAt:{type:Date, default:Date.now(), expires: 60*3}
});


otpSchema.pre('save', async function(next) {
    let check = this.isNew;
    if(check){
        // await mail(this.email ,this.otp);
        console.log("saved");
        next();
    }
    
});

const Otp= mongoose.model('OTP',otpSchema);
export default Otp;