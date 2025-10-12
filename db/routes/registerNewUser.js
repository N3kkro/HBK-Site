import express from "express";
import { pool } from "../pg_db/pool.js";

const router = express.Router();

router.post("/register", async (req, res) =>{
    const {username, email, password} = req.body;
    let finalusername = username?.trim() ? username?.trim() : "Anonymous";
    if(!email || !password){
        return res.status(400).send("email or password is missing");
    }
    try{
        await pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
            [finalusername, email, password]
        );
        res.status(201).send("Register is succesfully completed");
    }catch(err){
        console.error(err);
        res.status(500).send("Server error", err);
    }
});
export default router;