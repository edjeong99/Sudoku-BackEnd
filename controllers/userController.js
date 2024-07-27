const User = require("../models/userModel");
const GameTimes = require("../models/GameTimesModel");
const {updatePlayerStat, updateGameStat } = require("../util/time");

const updateStats = async (req, res) => {
  try {
    const { time, difficulty } = req.body;
    console.log("ssaveSudokuTime in userController req.user = ", req.user);
    const _id = req.user._id;

    await updatePlayerStat(_id, difficulty, time)
    await updateGameStat(difficulty, time)

    // const newTime = new CompletionTime({
    //   _id,
    //   difficulty,
    //   completionTime: time,
    // });
    // await newTime.save();
    // console.log("newTime saved successfully in sudokuSaveTime")

    res.status(200).json({ message: "Sudoku time saved successfully" });
  } catch (error) {
    console.error("Error saving Sudoku time:", error);
    res.status(500).json({ message: "Error saving Sudoku time" });
  }
};


module.exports = {
  updateStats,

};
