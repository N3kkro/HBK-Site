import express from "express";
import supabase from "../server.js";

const router = express.Router();

router.delete("/deleteNumber", async (req, res)=>{
    const {phoneNumber} = req.body;
    if(!phoneNumber){
        return res.status(400).json({success: false, message: "PhoneNumber is missing"});
    }
    try{
        const {data, error} = await supabase
        .from("users")
        .delete()
        .eq("phonenumber", phoneNumber)
        .select();
        if(!data || data.lenght === 0){
            throw error;
        }
        if(error){
            return res.status(400).json({success: false, message: "This number is doesn't exist"})
        }
        return res.status(200).json({success: true, message: "The number is successfully deleted"})
    }catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: "Server Error"});
    }
});
export default router;