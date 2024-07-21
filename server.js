const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { generateSudoku } = require("./sudoku");
const { findNextHint } = require("./util/findHint");
const connectDB = require("./util/db");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;
const allowedOrigins = [
  process.env.FRONTENDURL,
  "http://localhost:3000",
  "sudoku3.com",
];

app.use(
  cors(
  //   {
  //   origin: function (origin, callback) {
  //     if (!origin) return callback(null, true);
  //     if (allowedOrigins.indexOf(origin) === -1) {
  //       const msg =
  //         "The CORS policy for this site does not allow access from the specified Origin.";
  //       return callback(new Error(msg), false);
  //     }
  //     return callback(null, true);
  //   },
  // }
)
);

app.use(bodyParser.json());
connectDB();
app.use("/auth", authRoute);
app.use("/user", userRoute);

app.get('/', (req, res) => {
  const currentTime = new Date().toISOString();
  res.json({
    message: "Server is running",
    currentTime
  });
});
app.get("/generate", (req, res) => {
 // const difficulty = req.query.difficulty || "Easy"; // Get difficulty from query parameters
  const { puzzle, solution } = generateSudoku(req.query.difficulty || "Easy");
  res.json({ puzzle, solution });
});

app.post("/hint",findNextHint);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
