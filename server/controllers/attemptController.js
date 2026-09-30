import Attempt from "../models/Attempt.js";
import Mission from "../models/Mission.js";

export async function startAttempt(req, res) {
  try {
    const { missionId, studentName } = req.body;

    if (!missionId || !studentName) {
      return res.status(400).json({
        message: "Mission and student name are required."
      });
    }

    const mission = await Mission.findById(missionId);

    if (!mission) {
      return res.status(404).json({
        message: "Mission not found."
      });
    }

    const attempt = await Attempt.create({
      missionId,
      studentName,
      timeRemaining: mission.timeLimit
    });

    res.status(201).json(attempt);
  } catch (error) {
    res.status(500).json({
      message: "Unable to start mission."
    });
  }
}

export async function submitPuzzle(req, res) {
  try {
    const { puzzleId, answer } = req.body;

    const attempt = await Attempt.findById(req.params.id);

    if (!attempt) {
      return res.status(404).json({
        message: "Attempt not found."
      });
    }

    if (attempt.completed) {
      return res.status(400).json({
        message: "This mission is already complete."
      });
    }

    const mission = await Mission.findById(attempt.missionId);

    const puzzle = mission.puzzles.find(
      (item) => item.id === puzzleId
    );

    if (!puzzle) {
      return res.status(404).json({
        message: "Puzzle not found."
      });
    }

    const correct =
      String(answer).trim().toLowerCase() ===
      puzzle.answer.trim().toLowerCase();

    if (!correct) {
      return res.json({
        correct: false,
        message: "Incorrect solution."
      });
    }

    if (!attempt.solvedPuzzleIds.includes(puzzleId)) {
      attempt.solvedPuzzleIds.push(puzzleId);
    }

    await attempt.save();

    res.json({
      correct: true,
      reward: puzzle.reward,
      solvedPuzzleIds: attempt.solvedPuzzleIds
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to check puzzle."
    });
  }
}

export async function useHint(req, res) {
  try {
    const { puzzleId } = req.body;

    const attempt = await Attempt.findById(req.params.id);

    if (!attempt) {
      return res.status(404).json({
        message: "Attempt not found."
      });
    }

    const mission = await Mission.findById(attempt.missionId);

    const puzzle = mission.puzzles.find(
      (item) => item.id === puzzleId
    );

    if (!puzzle) {
      return res.status(404).json({
        message: "Puzzle not found."
      });
    }

    attempt.hintsUsed += 1;

    await attempt.save();

    res.json({
      hint: puzzle.hint,
      hintsUsed: attempt.hintsUsed
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get hint."
    });
  }
}

export async function completeAttempt(req, res) {
  try {
    const {
      timeRemaining = 0,
      completed = false
    } = req.body;

    const attempt = await Attempt.findById(req.params.id);

    if (!attempt) {
      return res.status(404).json({
        message: "Attempt not found."
      });
    }

    const mission = await Mission.findById(
      attempt.missionId
    );

    const puzzleCount = mission.puzzles.length;
    const solvedCount = attempt.solvedPuzzleIds.length;

    const actuallyCompleted =
      completed && solvedCount === puzzleCount;

    const baseScore = actuallyCompleted ? 500 : 0;

    const puzzleScore =
      solvedCount * 50;

    const timeScore =
      actuallyCompleted
        ? Math.floor(timeRemaining / 10) * 5
        : 0;

    const hintPenalty =
      attempt.hintsUsed * 25;

    attempt.timeRemaining = timeRemaining;
    attempt.completed = actuallyCompleted;
    attempt.completedAt = new Date();

    attempt.score = Math.max(
      0,
      baseScore +
      puzzleScore +
      timeScore -
      hintPenalty
    );

    await attempt.save();

    res.json(attempt);
  } catch (error) {
    res.status(500).json({
      message: "Unable to submit attempt."
    });
  }
}

export async function getAttempt(req, res) {
  try {
    const attempt = await Attempt.findById(
      req.params.id
    ).populate("missionId", "title code");

    if (!attempt) {
      return res.status(404).json({
        message: "Attempt not found."
      });
    }

    res.json(attempt);
  } catch (error) {
    res.status(500).json({
      message: "Unable to load attempt."
    });
  }
}