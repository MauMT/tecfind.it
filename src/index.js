const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const dotenv = require("dotenv");


//const bcrypt = require("bcrypt");
//const cookieParser = require("cookie-parser");
const session = require("express-session");

const {mongoose} = require("./database");
dotenv.config({ path: path.resolve(__dirname, './.env') });
const PORT = process.env.PORT || 3000;

//  ============= MIDDLEWARE

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use(cookieParser());


// ============= ROUTES
app.use("/", require("./routes/index.routes"));

//  ============= STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log(`Database: ${process.env.MONGODB_URI}`);