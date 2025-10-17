import { text } from "express";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "sayatkenesov159@gmail.com",
        pass: "Sayat2001"
    },
});







const mailOptions = {
    from: "sayatkenesov159@gmail.com",
    to: "sayatkenesov581@gmail.com",
    subject: "Test message",
    text: "Text Example: your code verification is 434839"
};

transporter.sendMail(mailOptions, (error, info)=>{
    if(error){
        console.log("Console error: ", error);
    }else{
        console.log("Info message: ", info.response);
    }
});