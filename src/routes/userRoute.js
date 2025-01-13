import express from "express";
import userController from "../controllers/userController.js";
// import validatePassword from "../middlewares/passwordValidation.js";
import resetController from "../controllers/resetController.js";
import authentication from "../controllers/authController.js";
import otpController from "../controllers/otpController.js";

const route= express.Router();

route.post("/create",userController.create);
route.post("/login" ,userController.login);
route.post("/authenticate", authentication);
route.post("/forget-password" ,resetController.forgetPassword);
route.post("/reset-password" ,resetController.resetpassword);
route.post("/send-otp" ,otpController.sendOtp);
route.post("/sign-up" ,otpController.signUp);

export default route;

