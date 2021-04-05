//jshint esversion:6

//npm init
//npm install express
//npm install -g nodemon
//npm install request
//npm install bosdy-parser
//npm install async

//npx nodemon server.js
//npm server.js
//npx nodemon server.js
const mailchimp = require('@mailchimp/mailchimp_marketing');
const express = require("express");
const request = require("request");
const app = express();
const https = require("https");
const async = require('async');
require('dotenv').config();
app.use(express.urlencoded({
  extended: true
}))
//To requre static folders we use this method
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;

  mailchimp.setConfig({
    apiKey: process.env.API_KEY,
    server: "us1",
  });

  const run = async () => {
    try {
      const response = await mailchimp.lists.addListMember("78a816e504", {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name,
          LNAME: surname
        }
      });
      console.log(response);
      res.sendFile(__dirname + "/success.html");
    } catch (e) {
      console.log(e);
      res.sendFile(__dirname + "/failure.html");
    }
  };
  run();
});

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
})

// API KEY
// 
// LIST
//
