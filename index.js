const express= require("express");
const bodyParser = require('body-parser');
const { createServer } = require("http");
const app = express();
const server = createServer(app);
const { connectDB } = require("./src/config/database");
const { ENV } = require("./src/config/env");
const port = ENV.API_PORT;


app.use(bodyParser.json());





server.listen(port, async () => {
    console.log("Server is running on", port);
    await connectDB();
  });
  