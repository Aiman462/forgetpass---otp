import User from "../models/user.js";
import passwordHash from "password-hash";
import token from "../utils/token.js";

const userController={

    create: async(req,res)=>{
        try {
            const findUser=await User.findOne({ email:req.body.email});
            if(findUser){
               res.status(400).send({ message: "User already exists" });
            }

            const user = new User(req.body);
            user.password = passwordHash.generate(req.body.password);

            await user.save();
            return res.status(201).send({ message: "User created successfully" ,user});
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: "Error creating user" ,error});
        }
    },
    login: async (req, res) => {
        try {
            const user = await User.findOne({ email:req.body.email});
            if (!user) {
                return res.status(404).send({ message: "Email not found" });
            }
            if (!passwordHash.verify(req.body.password, user.password)) {
                return res.status(401).send({ message: "Invalid password" });
            }

            const payload = {
                username: user.username,
                email: user.email
            };
            const options = {
                expiresIn: "1h",
                algorithm: "HS256",
            };
            const secretKey=process.env.JWT_SECRET;
            const Token = token.createToken(payload,secretKey,options);
            console.log(Token);
             
              
            return res.status(201).send({ message: "Login Successful",Token });

        } catch (error) {

            console.log(error);
            return res.status(400).send({ message: "Error logging in",error });
        }
    },
 
}

export default userController;