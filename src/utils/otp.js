import nodemailer from "nodemailer";

const mail= async(email,otp)=>{

  try{
    let transporter=nodemailer.createTransport({
        service: 'gmail',
          auth: {
            user: process.env.USER,
            pass: process.env.PASS,// google app password
          }
      })
    
      const mailInfo= await transporter.sendMail({
         from: 'example@gmail.com',
         to: email,
         subject: "login otp",
         info: `Your otp code is ${otp}`
      })
      console.log(mailInfo);
      
  }catch(error){
    console.log(error);
    
    return res.status(400).send({ message: 'Failed to send OTP' });
  }
}

export default mail;