const express = require("express");
const https = require("https");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {      // home page route
  res.json({
    message: "Welcome page",
  });
});


app.get("/auth/google", (req, res) => {      // auth route 

  let user_info;
  let options = {
    method: "GET",
    hostname: "www.googleapis.com",
    path: "/userinfo/v2/me",
    headers: {
      Authorization:  // bearer token taken from Google Auth playground,needs to be updated after it is expired
        "Bearer ya29.a0ARrdaM9ObhfH0-8MnNmwBrCzBH8ZrOeaMw1HCcrY7H-7sd9RgycenrlaoZLmbzYxUsXmyF6Vj0TrG0sa3MCHELLyvSa1bDBUIbTpo3cRZ8axayGPBkUnCxoK7mZYeymcxci8_m5lZDj9GaWAjfEOsCdAhFUt",
    },
  };
  
  let req2 = https.request(options, (res2) => {
    res2
      .on("data", (chunk) => {
        user_info = JSON.parse(chunk);    //response is a buffer, converted to json
        console.log("1", user_info);
        res.json({'email':user_info.email, 'name': user_info.name})     // final response of email and name
      })
      .on("error", function (error) {
        console.error(error);
      });
  });

  req2.end();
});

app.listen(3000, () => {
  console.log("app is listening on 3000");
});
