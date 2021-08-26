const express = require("express");
const https = require("https");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome page",
  });
});

// setTimeout(function func() {
//   console.log("2", user_info);
// }, 3000);

app.get("/auth/google", (req, res) => {

  let user_info;
  let options = {
    method: "GET",
    hostname: "www.googleapis.com",
    path: "/userinfo/v2/me",
    headers: {
      Authorization:
        "Bearer ya29.a0ARrdaM-PKXYfKvPfYn0x-E3M0MLukWH94RJWccQPe5a80kySFKjrfJZgruJJfaEoMpd0rgHg_pD4WZxG_vISlcbU1xTmndJY7qY9JF_-kBCHf99GEcUDb0H20qh-LVutkAIhqVd-JlqxIJe5a_H3cCRk_HKE",
    },
  };
  
  let req2 = https.request(options, (res2) => {
    res2
      .on("data", (chunk) => {
        user_info = JSON.parse(chunk);
        console.log("1", user_info);
        res.json({'email':user_info.email, 'name': user_info.name})
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
