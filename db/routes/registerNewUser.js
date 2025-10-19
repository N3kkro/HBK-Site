import express, { response } from "express";
import { pool } from "../pg_db/pool.js";
import supabase from "../server.js";
import { SendingSMS } from "./SMS.js";
import { SendEmail } from "./NodeEmailer.js";
const router = express.Router();

router.post("/registerWithEmail", async (req, res) =>{
    const {username, email, password} = req.body;
    let finalusername = username?.trim() ? username?.trim() : "Anonymous";
    if(!email || !password){
        return res.status(400).json({message: "email or password is missing", });
    }
    try{
        //check if user doesn't exists
        const {data: existingUser, error: selectedError} = await supabase
        .from("users")
        .select("email")
        .eq("email", email)
        .single();
        if(selectedError && selectedError.code !== "PGRST116"){
            return res.status(500).json({success: false, message: "Database check failed"});
        }
        if(existingUser){
            return res.status(409).json({success: false, message: "User already exist"});
        }
        //adding user
        const {data, error} = await supabase
        .from("users")
        .insert({email: email, password: password, username: finalusername})
        .select();
        if(error){
            console.error(error);
            return res.status(401).json({message: "Invalid inserting", error});
        }
        const Code = Math.floor(100000 + Math.random() * 900000);
        SendEmail(email,Code);
        //send to verifications table where we will check the valid code
        await supabase.from("verifications").upsert([{"email": email, "code": Code, created_at: new Date()}]).select();
        return res.status(201).json({success: true, message: "Register is succesfully completed", data});
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Server error", err});
    }
});
router.post("/registerWithPhoneNumber", async (req, res)=>{
    const {username, phoneNumber, password} = req.body;
    let finalusername = username?.trim() ? username?.trim() : "Anonymous";
    //check if it's not empty
    if(!phoneNumber || !password){
        return res.status(400).json({success: false, message: "Phone number or password is missing"});
    }
    try{
        const formattedNumber = phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`; 
        //check if user exists
        const {data: existingUser, error: selectedError} = await supabase
        .from("users")
        .select("phonenumber")
        .eq("phonenumber", formattedNumber)
        .maybeSingle(); 
        if(selectedError && selectedError.code !== "PGRST116"){
            console.error(selectedError);
            return res.status(500).json({success: false, message: "Database check failed"});
        }
        if(existingUser){
            return res.status(409).json({success: false, message: "User already exists"});
        }
        //adding user
        const{data, error} = await supabase
        .from("users")
        .insert({phonenumber: formattedNumber, password: password, username: finalusername})
        .select();
        if(error){
            return res.status(401).json({success: false, message: "Invalid inserting"})
        }
        const Code = Math.floor(100000 + Math.random() * 900000);   
        const smsMessage = await SendingSMS(formattedNumber, Code);
        if(!smsMessage.success){
        console.error("Failed to send SMS:", smsMessage.err);
        return res.status(500).json({ success: false, message: "Failed to send verification code" });
        }
        await supabase.from("verifacations").upsert([{"phonenumber": formattedNumber, "code": Code}]);
        return res.status(200).json({success: true, message: "Successful register", user: data[0]});
        
    }catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: "Server error"});
    }
});
export default router;