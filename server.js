const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();
const db = require("./models");
const corsSettings = {
  originL: "http://localhost:8081"
};

// const api = require("./routes/index");
const api = require("./routes/index");
server.use(cors(corsSettings));
// Parse request of content-type - application/json
server.use(bodyParser.json());
// parse requests of content-type -application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));

api(server)
// set listening ports for request
const port = process.env.PORT || 80;

server.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});

process.on('uncaughtException', function (err) {
  //打印出错误
  console.log(err)
  //打印出错误的调用栈方便调试
  console.log(err.stack)
});

// Run following function if you want drop existing tables and re-sync database
// db.dropRestApiTable();
db.databaseConf.sync();
