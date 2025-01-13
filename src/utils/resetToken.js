import * as crypto from 'crypto';

const resetToken= ()=>{   
    const token= crypto.randomBytes(20).toString('hex');
    const expiration= new Date()+ (60*2);
    console.log(expiration,token);
    
}

export default resetToken;