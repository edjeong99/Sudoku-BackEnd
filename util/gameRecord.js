const getGameTimes = async (req, res) => {
    const { time, difficulty } = req.body;

    try {
      const allTimes = await Game.find({difficulty: difficulty})
                                  .sort({completionTime: 1})
                                  .select('completionTime');
      
        console.log(allTimes)
      res.json({
        allTimes: allTimes.map(game => game.completionTime),
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching game times' });
    }
  };


  module.exports = { getGameTimes}