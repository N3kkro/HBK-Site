import express from "express";
import supabase from "../server.js";
import { SendingSMS } from "./SMS.js";
const router = express.Router();
router.post("/verifyCode", async (req, res)=>{
    const {phoneNumber, code} = req.body;
    if(!phoneNumber || !code){
        return res.status(400).json({success: false, message: "PhoneNumber is missing"});
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
        if(existingNum){
            return res.status(409).json({success: false, message: "Number already exists please go to sign in"});
        }else{
        const{data: verification, error: verificationError} = await supabase
        .from("verifactions")
        .select("phonenumber", "code")
        .eq([{"phonenumber": phoneNumber, "code": code}])
        .maybeSingle();
        if(error) throw error;
        if(!verification)
        //Error
        return res.status(400).json({success: false, message: "Invalid code or number"});
        //Valid
        return res.status(200).json({success: true, message: "Verifacation code sent"}); 
        }
    }catch(err){
        console.error(err);
            return res.status(500).json({success: false, message: "Error server"});
    }//if the register phonenumber is exists in registerWithPhoneNumber then don't send a code and send message about existing account
    //else if phonenumber is not exists and relevant to the format(twelwe numbers) then add the verifacation code to the verification table.
    //and do it in register endpoint, in this endpoint verifyCode create a check
    //verifyCode check: if the number and code are equal to each other then we are checking is the user wrote it right or not. if yes then we do valid true else false
});
export default router;