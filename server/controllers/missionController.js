import Mission from "../models/Mission.js";

export async function getMissions(req, res) {
  try {
    const missions = await Mission.find({
      active: true
    }).select("-puzzles.answer -puzzles.hint");

    res.json(missions);
  } catch (error) {
    res.status(500).json({
      message: "Unable to load missions."
    });
  }
}

export async function getMission(req, res) {
  try {
    const mission = await Mission.findOne({
      _id: req.params.id,
      active: true
    }).select("-puzzles.answer -puzzles.hint");

    if (!mission) {
      return res.status(404).json({
        message: "Mission not found."
      });
    }

    res.json(mission);
  } catch (error) {
    res.status(500).json({
      message: "Unable to load mission."
    });
  }
}