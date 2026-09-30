import mongoose from "mongoose";

const puzzleSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true
    },

    type: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    prompt: {
      type: String,
      required: true
    },

    answer: {
      type: String,
      required: true
    },

    hint: {
      type: String,
      required: true
    },

    icon: {
      type: String,
      default: "🧩"
    },

    reward: {
      name: String,
      icon: String
    }
  },
  {
    _id: false
  }
);

const missionSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    icon: {
      type: String,
      default: "🚀"
    },

    difficulty: {
      type: Number,
      default: 1
    },

    timeLimit: {
      type: Number,
      default: 900
    },

    puzzles: [puzzleSchema],

    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Mission", missionSchema);