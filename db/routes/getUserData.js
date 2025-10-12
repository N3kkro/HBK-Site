import express from "express";
import {pool} from "../pg_db/pool.js";

const router = express.Router();

router.get("/getuser", async (req, res)=>{
    try{
        const result = await pool.query("SELECT username, email, password from users");
        res.json(result.rows);
    }catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }
});
export default router;