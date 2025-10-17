import express from "express";
import {pool} from "../pg_db/pool.js";
import supabase from "../server.js";

const router = express.Router();
router.get("/getuser", async (req, res)=>{
    try{
    const {data, error} = await supabase
    .from("users")
    .select("phonenumber, email, password")
    if(error) res.status(400).json({message: "Error getting user", error});
        //здесь отправить сообщение об ошибке
    else res.status(200).json({messaage: "Success", data} );
         //здесь вывести ответ в виде json
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server error", error});
    }
});
export default router;