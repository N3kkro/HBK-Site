import express from "express";
import supabase from "../server.js";
import { SendingSMS } from "./SMS.js";
import { SendEmail } from "./NodeEmailer.js";
const router = express.Router();
router.post("/verifyCodeEmail", async (req, res)=>{
    const {email, code} = req.body;
    if(!email || !code){
        return res.status(400).json({success: false, message: "Email is missing or code"});
    }
    try{
        const {data: existingNum, error: userError} = await supabase
        .from("users")
        .select("email")
        .eq("email", email)
        .maybeSingle();
        if(userError){
            throw userError;
        }
        if(!existingNum){
        return res.status(404).json({ success: false, message: "User not found" });
        }
        //if email exist on the table
        const{data: verification, error: verificationError} = await supabase
        .from("verifications")
        .select("code") 
        .eq("email", email)
        .eq("code", code)
        .maybeSingle();
        if(verificationError) throw verificationError;
        if(!verification){
        //Error
        return res.status(400).json({success: false, message: "Invalid verification code"});
        }
        //Valid
        if(verification.code == code){
        await supabase
        .from("users")
        .update({verified: true})
        .eq("email", email);
        return res.status(200).json({success: true, message: "Verifacation code sent"}); 
        }
    
    }catch(err){
        console.error(err);
            return res.status(500).json({success: false, message: "Error server"});
    }
});
router.post("/verifyCodePhoneNumber", async (req, res)=>{
    const {phoneNumber, code} = req.body;
    if(!phoneNumber || !code){
        return res.status(400).json({success: false, message: "PhoneNumber is missing or code"});
    }
    try{
        const {data: existingNum, error: userError} = await supabase
        .from("users")
        .select("phonenumber")
        .eq("phonenumber", phoneNumber)
        .maybeSingle();
        if(userError){
            throw userError;
        }
        if(!existingNum){
            return res.status(409).json({success: false, message: "Email not found"});
        }else{
        const{data: verification, error: verificationError} = await supabase
        .from("verifications")
        .select("phonenumber", "code")
        .eq([{"phonenumber": phoneNumber, "code": code}])
        .maybeSingle();
        if(error) throw error;
        if(!verification){
        return res.status(400).json({success: false, message: "Invalid code or number"});
        }
        //Valid below supabase with email, so change to number then
        await supabase
        .from("users")
        .update({verified: true})
        .eq("email", email);
        return res.status(200).json({success: true, message: "Verifacation code sent"}); 
        }
    }catch(err){
        console.error(err);
            return res.status(500).json({success: false, message: "Error server"});
    }
});
export default router;