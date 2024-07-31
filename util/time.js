
const GameTimes = require("../models/GameTimesModel");

const getAllTimes = async (req, res) => {
    const difficulty = req.query.difficulty || "Easy"; 
    try {
const allTimes = await GameTimes.find({difficulty: difficulty})
.sort({completionTime: 1})
.select('completionTime');

//console.log(allTimes)

res.status(200).json({ allTimes: allTimes.map(game => game.completionTime),
message: "send all times" });
} catch (error) {
console.error("Error saving Sudoku time:", error);
res.status(500).json({ message: "Error saving Sudoku time" });
}
}

module.exports = {getAllTimes}