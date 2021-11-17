const express = require("express");
const morgan = require("morgan");


const path = require("path");
const app = express();
const dotenv = require("dotenv");


//const bcrypt = require("bcrypt");
//const cookieParser = require("cookie-parser");
const session = require("express-session");

const HttpError = require('./models/http-error');

const {mongoose} = require("./database");
dotenv.config({ path: path.resolve(__dirname, './.env') });
const PORT = process.env.PORT || 3000;

//  ============= MIDDLEWARE

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT');

  next();
});

// ============= ROUTES
app.use("/", require("./routes/index.routes"));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

//  ============= STATIC FILES


// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log(`Database: ${process.env.MONGODB_URI}`);