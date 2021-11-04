const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();

//const bcrypt = require("bcrypt");
//const cookieParser = require("cookie-parser");
//const session = require("express-session");

const PORT = process.env.PORT || 3000;

//  ============= MIDDLEWARE

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use(cookieParser());

// ============= ROUTES
app.use("/api", require("./routes/index.routes"));

//  ============= STATIC FILES


// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});