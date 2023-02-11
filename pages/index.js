import { useState } from "react";
import axios from "axios";

const Example = () => {

  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

/*
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      
      //call API using fetch
      //https://username:password@api.twilio.com/2010-04-01/your_desired_path
      //https://${TWILIO_AUTH_TOKEN}:${TWILIO_SID}@api.twilio.com/2010-04-01/Messages.json
      console.log("Hi");
      const body = {
        "Body": "Hello from Twilio",
        "From": "+16184228665",
        "To": "+14379939171"
      }
       const formBody= Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&');
      console.log(formBody)
      await fetch("https://api.twilio.com/2010-04-01/Accounts/ACabad1b4974638dc6aeff4e7f850953e4/Messages.json?Body=Hello%20from%20Twilio&From=%2016184228665&To=%2014379939171", {
        headers: {
          Authorization: "Basic QUNhYmFkMWI0OTc0NjM4ZGM2YWVmZjRlN2Y4NTA5NTNlNDplNzM4MzY0N2YyMjA0M2NhMDRiYjk5ZDY5ODg2NjY3Mg==",
          'Content-Type': 'application/x-www-form-urlencoded',
          //body: formBody           
        },
        method: "POST"
      })

      //Try catch. Verify if msg was sent properly
      if (response.status === 201) {
        setSuccess(true);
        setLoading(false);

      } else {
        setError("The message was unable to be sent. Please try again later.");
        setLoading(false);

      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while sending the message. Please try again later.");
      setLoading(false);
    }
  };*/

  //code that deals with form input. have a handle function


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const body = { message, phoneNumber};

    
    console.log(e);
    try {
      await axios.post('/api/twilio', body);
      setSuccess(true);

    } catch (error) {
      console.error(error);
      setError(error.message);
    }
    };

    return (
      <>
      <form onSubmit={handleSubmit}>
        {error && <b><div style={{ color: "red"}}>{error}</div></b>}
        {success && <div style={{ color: "green"}}>Message sent successfully!</div>}

        <input
          type="text"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          placeholder="Phone Number (format: +12345678900)"
        />

        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Message"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
      </>
    );
  }

export default Example;