import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config({ path: "../routes/dotenv.env" });

const client = twilio(process.env.Twilio_Token_SID, process.env.Twilio_Token_AUTH);
export async function SendingSMS(ToMessage, code){   
try{
const message = await client.messages.create ({
    body: `Your verifacation code is ${code}`,
    from: process.env.Twilio_Phone_Number,
    to: ToMessage
});
console.log("message sent successfully:", message.sid);
return {success:true, code}
}catch(err){
    console.error(err);
    return {success: false, err}
}
}