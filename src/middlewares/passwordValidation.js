import PasswordValidator from "password-validation";

const validation= new PasswordValidator()
    .is().min(8,"Minimum length 8")
    .is().max(18,"Maximum length 100")
    .uppercase(1,"Password Must have an uppercase letter")
    .lowercase(1,"Password Must have a lowercase letter")
    .digits(1,"Password Must have a digit")
    .not().spaces(0,"Password shuold not have any spaces");

const validatePassword= async(req,res,next)=>{

    const validator = validation.validate(req.body.password, { details : true }); 
    if (!(validation.validate(req.body.Password))) {
      return res.status(400).send({ message: "invalid password" ,validator});
    }else{
        next();
    }
}

export default validatePassword;