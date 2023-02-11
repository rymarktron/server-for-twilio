import Twilio from "twilio";

export default async function handler(req, res) {
  //export async function getServerSideProps(req) {        
      //console.log("Hi")
  const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_1;
  const TWILIO_SID = process.env.TWILIO_SID_1;
  const FROM_PHONE_NUMBER = process.env.FROM_PHONE_NUMBER_1;

  if(req.method === "POST")
  {
    const { message : msg} = req.body;
    console.log({msg});

  //msg = "Hello from Twilio"
  const client = Twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);
  let message = null;

  return client.messages.create({
      body: msg, 
      from: FROM_PHONE_NUMBER,//"+16184228665",
      to: "+14379939171"
  }).then(msg => {
      console.log(msg)
      message = msg.sid});
      
      /*return {
        props: {message}, // will be passed to the page component as props
      }*/
    //}
  }    

  res.status(200).json({ message: "success"});
}