const TWILIO_AUTH_TOKEN = TWILIO_AUTH_TOKEN.process.env;
const TWILIO_SID = TWILIO_SID.process.env;
const FROM_PHONE_NUMBER = FROM_PHONE_NUMBER.process.env;

export default function SendTwilio(originalRecipe) {
  const phoneNumberRegex = /^[0-9]{10}$/;

  let phone = '';
  let loading = false;
  let showSendMessage = false;

  function isPhoneNumber(input) {
    return phoneNumberRegex.test(input);
  }

  function setPhone(newPhone) {
    phone = newPhone;
  }

  function setLoading(newLoading) {
    loading = newLoading;
  }

  function setShowSendMessage(newShowSendMessage) {
    showSendMessage = newShowSendMessage;
  }

  const sendMessage = (to, body) => {
    const accountSid = TWILIO_SID;
    const authToken = TWILIO_AUTH_TOKEN;
    const from = FROM_PHONE_NUMBER;

    const data = new FormData();
    data.append("To", to);
    data.append("From", from);
    data.append("Body", body);

    fetch(
      "https://api.twilio.com/2010-04-01/Accounts/" +
        accountSid +
        "/Messages.json",
      {
        method: "post",
        body: data,
        headers: {
          Authorization: "Basic " + btoa(accountSid + ":" + authToken),
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          setShowSendMessage(true);
          setLoading(false);
        } else {
          console.log("Error sending text message: " + response.status);
        }
      })
      .catch((error) => {
        console.log("Error sending text message: " + error);
      });
  };
}