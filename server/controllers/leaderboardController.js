import Attempt from "../models/Attempt.js";

export async function getLeaderboard(req, res) {
  try {
    const leaderboard = await Attempt.aggregate([
      {
        $match: {
          completed: true
        }
      },
      {
        $group: {
          _id: "$studentName",
          totalScore: {
            $sum: "$score"
          },
          missionsCompleted: {
            $sum: 1
          }
        }
      },
      {
        $sort: {
          totalScore: -1
        }
      },
      {
        $limit: 100
      }
    ]);

    const formatted = leaderboard.map(
      (student, index) => ({
        rank: index + 1,
        studentName: student._id,
        totalScore: student.totalScore,
        missionsCompleted:
          student.missionsCompleted
      })
    );

    res.json(formatted);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Unable to load leaderboard."
    });
  }
}