const express = require("express");
const path = require("path");
const app = express();
const { MongoClient } = require('mongodb');


app.use(express.json());
var cors = require("cors");
app.use(cors());
require("dotenv").config();

let db;
const url = process.env.DB_URL;
new MongoClient(url)
  .connect()
  .then((client) => {
    db = client.db("popol5");
    console.log("DB연결성공");
    app.listen(process.env.PORT, function () {
      console.log("listening on 8080"); // 포트 번호 수정
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.static(path.join(__dirname, "client/build")));

app.get('/header', async (req,res) => {
  let result = await db.collection("product").find().toArray()
  console.log(result);
  res.status(201).send(result) 
})


app.get("/", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "/client/build/index.html"));
});








app.get("*", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "/client/build/index.html"));
});
