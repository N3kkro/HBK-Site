import express from "express";
import loginRouter from "./routes/checkAuthorization.js";
import registerRouter from "./routes/registerNewUser.js";
import getUsersData from "./routes/getUserData.js";
import getCode from "./routes/verifyCode.js";
import deleteUser from "./routes/deleteNum.js"
import {createClient} from "@supabase/supabase-js";
import cors from "cors";
const app = express();
const port = 3000;

const supabaseUrl = "https://vshsyilwzlxpulkmgrnl.supabase.co";
const supabaseApiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzaHN5aWx3emx4cHVsa21ncm5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0OTgwNDUsImV4cCI6MjA3NjA3NDA0NX0.-DBSW8-NhOclr17xEncG9zaxX4LsbyNbyRYXHyv8Qq4";
const supabase = createClient(supabaseUrl, supabaseApiKey);

//create a json
app.use(cors());
app.use(express.json());
app.use("/", loginRouter);
app.use("/", registerRouter);
app.use("/", getUsersData);
app.use("/", getCode);
app.use("/", deleteUser)
app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
})
export default supabase;