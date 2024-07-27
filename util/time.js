const User = require("../models/userModel");
const GameStats = require("../models/GameStatsModel");
const GameTimes = require("../models/GameTimesModel");


const updatePlayerStat = async (_id, difficulty, time) => {
  const user = await User.findById(_id);
  console.log(user);
  if (!user)
    // if no user, no need to update player stat
    return;

  // upate difficulty avg time
  user.avgTime[difficulty] =
    user.avgTime[difficulty] === 0
      ? time
      : (user.numOfPlayed[difficulty] * user.avgTime[difficulty] + time) /
        (user.numOfPlayed[difficulty] + 1);
  console.log(user.avgTime.Total);

  // update total avg time
  user.avgTime.Total =
    user.avgTime.Total === 0
      ? time
      : (user.numOfPlayed.Total * user.avgTime.Total + time) /
        (user.numOfPlayed.Total + 1);
  console.log("line 26 ", user.avgTime.Total);

  // update numOfPlayed for difficulty and total
  user.numOfPlayed[difficulty]++;
  user.numOfPlayed.Total++;

  // update bestTime
  user.bestTime[difficulty] = user.bestTime[difficulty] === 0 ? time :
    user.bestTime[difficulty] <= time ? user.bestTime[difficulty] : time;
  user.bestTime.Total = user.bestTime.Total === 0 ? time :
    user.bestTime.Total <= time ? user.bestTime.Total : time;

  await user.save();
};

const updateGameStat = async (difficulty, time) => {
 
        let gameStats = await GameStats.findOne();
        if (!gameStats) {
            gameStats = new GameStats({ _id: 'global_stats' });        }
        console.log(gameStats);
        gameStats.numOfPlayed[difficulty]++
        gameStats.numOfPlayed.total++


    // upate difficulty avg time
    gameStats.avgTime[difficulty] =
    gameStats.avgTime[difficulty] === 0
        ? time
        : (gameStats.numOfPlayed[difficulty] * gameStats.avgTime[difficulty] + time) /
          (gameStats.numOfPlayed[difficulty] + 1);
    
  
    // update total avg time
    gameStats.avgTime.Total =
    gameStats.avgTime.Total === 0
        ? time
        : (gameStats.numOfPlayed.Total * gameStats.avgTime.Total + time) /
          (gameStats.numOfPlayed.Total + 1);
    console.log("line 26 ", gameStats.avgTime.Total);
  

  console.log("line 70", gameStats)
    // // update bestTime
    // user.bestTime[difficulty] = user.bestTime[difficulty] === 0 ? time :
    //   user.bestTime[difficulty] <= time ? user.bestTime[difficulty] : time;
    // user.bestTime.Total = user.bestTime.Total === 0 ? time :
    //   user.bestTime.Total <= time ? user.bestTime.Total : time;
  
    await gameStats.save();
  };

const getAllTimes = async (req, res) => {
  const difficulty = req.query.difficulty || "Easy";
  try {
    const allTimes = await GameTimes.find({ difficulty: difficulty })
      .sort({ completionTime: 1 })
      .select("completionTime");

    //console.log(allTimes)

    res
      .status(200)
      .json({
        allTimes: allTimes.map((game) => game.completionTime),
        message: "send all times",
      });
  } catch (error) {
    console.error("Error saving Sudoku time:", error);
    res.status(500).json({ message: "Error saving Sudoku time" });
  }
};

module.exports = { getAllTimes, updatePlayerStat, updateGameStat };
