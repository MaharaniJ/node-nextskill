const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

require("./config/db");

const DefaultData = require("./DefualtData");
const Router = require("./routers/router");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "*", //  origin of client-side application
    methods: "GET,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow credentials (cookies) to be sent with the request
  })
);
app.use(express.json());
app.use(cookieParser(""));

app.use(Router);

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
DefaultData();
