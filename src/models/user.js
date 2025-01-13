import mongoose from "mongoose";

const Userschema= new mongoose.Schema({

    username: { type:String , required: true , unique: true , min:4 , max:18,trim:true  },
    // first_name: {type:String, required: true,trim:true },
    // last_name: {type:String, required: true,trim:true  },
    password: { type:String , required: true , unique: true },
    role: { type:String , required: true , enum:['Admin' ,'Creator', 'User'] },
    email: { type:String , required: true , unique: true , match: /\S+@\S+\.\S+/ },
    age:  { type:Number , required: true, min:18 },
    // birthDate: { type:Date }
    resetToken:{type:String ,unique:true},
    tokenExpiration:{type:Date}
});

const User=  mongoose.model("User", Userschema);

export default User;