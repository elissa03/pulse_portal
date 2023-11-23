const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT;

const currentDirectory = __dirname;
const buildDirectory = path.join(currentDirectory, "build");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" }));

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));
app.use("/exercise", require("./routes/exercise"));
app.use("/workout", require("./routes/workout"));
app.use("/workout_ex", require("./routes/exercise_workout"));
app.use("/firebase", require("./routes/firebase"));

app.use(express.static(buildDirectory));

// npm run dev --to run
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
