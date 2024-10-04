const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { generateSudoku } = require("./sudoku");
const { findNextHint} = require("./util/findHint");
const connectDB = require("./util/db");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const playRoute = require("./routes/playRoute");
const { getGameTimes } = require("./util/gameRecord");
const {getAllTimes } = require("./util/time");
const {verifyToken} = require("./util/verifyToken");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();
app.use(  cors());
app.use(bodyParser.json());
app.use("/auth", authRoute);
console.log(verifyToken);
app.use("/user",verifyToken , userRoute);
app.use("/play", playRoute);
//app.use("admin", verifyToken, adminRoute);

app.get('/', (req, res) => {
  const currentTime = new Date().toISOString();
  res.json({
    message: "Server is running",
    currentTime
  });
});
// app.get("/generate", (req, res) => {
//  const difficulty = req.query.difficulty || "Easy"; // Get difficulty from query parameters
//   const { puzzle, solution } = generateSudoku(difficulty);
//   res.json({ puzzle, solution });
// });

app.get("/getAllTimes", getAllTimes);
// app.post("/hint",findNextHint);

app.get('/game-times', getGameTimes);

// router.post('/chat', async (req, res) => {
//   const { message } = req.body;
//   const response = await processChatMessage(message);
//   res.json({ response });
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
