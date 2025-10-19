import { text } from "express";
import nodemailer from "nodemailer";
//auth
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "sayatkenesov159@gmail.com",
        pass: "xrywyhtcpupegveu"
    },
});


export function SendEmail(mail, code){
    const mailOptions = {
    from: "sayatkenesov159@gmail.com",
    to: `${mail}`,
    subject: "Code verification",
    text: `--------------------------------
    your code verification is ${code}
    --------------------------------`
};
transporter.sendMail(mailOptions, (error, info)=>{
    if(error){
        console.log("Console error: ", error);
    }else{
        console.log("Info message: ", info.response);
    }
})};