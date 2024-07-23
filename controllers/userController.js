const User = require("../models/userModel");
const CompletionTime = require("../models/CompletionTimeModel");

const saveSudokuTime = async (req, res) => {
  try {
    const { time, difficulty } = req.body;
console.log("ssaveSudokuTime in userController req.user = ", req.user)
    const uid = req.user.id;

    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
      const Game = mongoose.model("Game", GameSchema);
    }
    // update time, avg, etc
   // console.log(difficulty, user.timeStat.count[difficulty]);
    user.timeStat.avgTime[difficulty] =
      user.timeStat.avgTime[difficulty] === 0
        ? time
        : (user.timeStat.count[difficulty] * user.timeStat.avgTime[difficulty] +
            time) /
          (user.timeStat.count[difficulty] + 1);
    user.timeStat.avgTime.Total =
      user.timeStat.avgTime.Total === 0
        ? time
        : (user.timeStat.count.Total * user.timeStat.avgTime.Total + time) /
          (user.timeStat.count.Total + 1);

    user.timeStat.count[difficulty]++;
    user.timeStat.count.Total++;

    // user.sudokuTimes.push({ time });
    await user.save();

    const newTime = new CompletionTime({
      uid,
      difficulty,
      completionTime: time,
    });
    await newTime.save();

    res.status(200).json({ message: "Sudoku time saved successfully" });
  } catch (error) {
    console.error("Error saving Sudoku time:", error);
    res.status(500).json({ message: "Error saving Sudoku time" });
  }
};

const createUserProfile = async (req, res) => {
  const { uid, email, displayName } = req.body;

  try {
    let user = await User.findOne({ uid });
    if (user) {
      user.email = email;
      user.displayName = displayName || "";
      await user.save();
    } else {
      user = new User({ uid, email, displayName });
      await user.save();
    }
    res
      .status(200)
      .send({ message: "User profile created/updated successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error creating/updating user profile", error });
  }
};

const getUserProfile = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await User.findOne({ uid });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: "User profile not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error fetching user profile", error });
  }
};

const updateUserProfile = async (req, res) => {
  const { uid } = req.params;
  const data = req.body;

  try {
    const user = await User.findOneAndUpdate({ uid }, data, { new: true });
    if (user) {
      res
        .status(200)
        .send({ message: "User profile updated successfully", user });
    } else {
      res.status(404).send({ message: "User profile not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error updating user profile", error });
  }
};

module.exports = {
  saveSudokuTime,
  createUserProfile,
  getUserProfile,
  updateUserProfile,
};
