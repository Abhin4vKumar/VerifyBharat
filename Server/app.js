const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
var cors = require('cors') 

const app = express();
app.use(cors())

app.use(express.json());
app.use(cookieParser());
//Route Imports
const certificate = require("./routes/certificateRoute");
const user = require("./routes/userRoute");
const organisation = require("./routes/organisationRoute");
app.use("/api/v1", certificate);
app.use("/api/v1", user);
app.use("/api/v1", organisation);
//Middleware for error
app.use(errorMiddleware);

module.exports = app
