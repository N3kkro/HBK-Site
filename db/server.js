import express from "express";
import loginRouter from "./routes/checkAuthorization.js";
import registerRouter from "./routes/registerNewUser.js";
import getUsersData from "./routes/getUserData.js";
import cors from "cors";
const app = express();
const port = 3000;


//create a json
app.use(cors());
app.use(express.json());
app.use("/", loginRouter);
app.use("/", registerRouter);
app.use("/", getUsersData)
app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
})