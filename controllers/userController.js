const User = require("../models/userModel");
const GameTimes = require("../models/GameTimesModel");
const {updatePlayerStat, updateGameStats, updateGameTimes } = require("../util/time");

const updateStats = async (req, res) => {

  try {
    const { time, difficulty, userId } = req.body;
    console.log("ssaveSudokuTime in userController  ",time, difficulty, userId);
    let user;

    // Execute all asynchronous functions in parallel
    const promises = [];

    if (userId) {
      promises.push(
        updatePlayerStat(userId, difficulty, time).then((result) => {
          user = result;
        })
      );
    }

    promises.push(updateGameStats(difficulty, time));
    promises.push(updateGameTimes(userId, difficulty, time));
    await Promise.all(promises);

    res.status(200).json({ user:user, message: "Sudoku time saved successfully" });
  } catch (error) {
    console.error("Error saving Sudoku time:", error);
    res.status(500).json({ message: "Error saving Sudoku time" });
  }
};


module.exports = {
  updateStats,

};
