import express from "express";
import { pool } from "../pg_db/pool.js";
import supabase from "../server.js";

//check account (sign in)
const router = express.Router();
//do a method post that will post if it avaiable
router.post("/loginWithEmail", async (req, res) =>{
    const {email, password} = req.body;
    
    if(!email || !password){
        return res.status(400).json({success: false, message: "email or password is missing"});
    }
    try{
        const {data, error} = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .eq("password", password) 
            if(error){
                console.error("Database error");
                return res.status(400).json({success: false, message: "Database error", error });
            }
            if(data.length > 0 && data){
                const user = data[0];
                
                return res.status(200).json({success: true, message: "Succesful login"});
            
            }
            
            return res.status(401).json({success: false, meesage: "Invalid email or password"});
    
        
    }catch(err){
        console.error("Database error", err);
        res.status(500).json({success: false, message:"Server error"});
    }
});
router.post("/loginWithPhoneNumber", async (req, res) =>{
    const {number, password} = req.body;

    if(!number || !password){
        return res.status(400).json({success: false,message: "Number or password is missing"});
    }
    try{
        const{data, error} = await supabase
        .from("users")
        .select("*")
        .eq("phonenumber", number)
        .eq("password", password);
        if(error){
            console.error(error);
            return res.status(400).json({success: false, message: "Database error"});
        }
        if(data && data.length > 0){
            const user = data[0];
            const phoneRegex = /^\+7\d{10}$/;
            if(phoneRegex.test(user.number) && password.length>2)
            return res.status(200).json({success: true, message: "Successful login"});
         
        }
        return res.status(401).json({status: false, message: "Invalid password or phone number"});
    }catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Server error"});
    }
});
export default router;