import express from "express";
import { pool } from "../pg_db/pool.js";

//check account (sign in)
const router = express.Router();
//do a method post that will post if it avaiable
router.post("/login", async (req, res) =>{
    const {email, password} = req.body;
    
    if(!email || !password){
        return res.status(400).send("email or password is missing");
    }
    try{
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1 AND password = $2",
            [email, password]
        );
        if(result.rows.length > 0){
            return res.status(200).send("Succesful login");
        }else{
            return res.status(401).send("Invalid email or password");
        }
    }catch(err){
        console.error("Database error", err);
        res.status(500).send("Server error");
    }
});
export default router;