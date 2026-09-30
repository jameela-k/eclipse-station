import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
  {
    missionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mission",
      required: true
    },

    studentName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },

    startedAt: {
      type: Date,
      default: Date.now
    },

    completedAt: Date,

    timeRemaining: {
      type: Number,
      default: 0
    },

    solvedPuzzleIds: {
      type: [String],
      default: []
    },

    hintsUsed: {
      type: Number,
      default: 0
    },

    completed: {
      type: Boolean,
      default: false
    },

    score: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Attempt", attemptSchema);