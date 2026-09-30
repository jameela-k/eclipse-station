import mongoose from "mongoose";
import dotenv from "dotenv";
import Mission from "../models/Mission.js";

dotenv.config();

const missions = [
  {
    code: "ECL-001",
    title: "The Locked Station",
    description:
      "Eclipse Station has gone dark. Restore the systems and reach the escape pod.",
    icon: "🛰️",
    difficulty: 1,
    timeLimit: 900,

    puzzles: [
      {
        id: "navigation",
        type: "logic",
        title: "Navigation Console",
        description:
          "The navigation computer has lost its route.",
        prompt:
          "SIRIUS\nVEGA\nPOLARIS\n\nClue: Polaris is farthest.\nSirius is closer than Vega.",
        answer: "siriusvega",
        hint:
          "The clue already gives you the order of the first two.",
        icon: "📡",
        reward: {
          name: "Navigation Access",
          icon: "📡"
        }
      },

      {
        id: "reactor",
        type: "logic",
        title: "Reactor Control",
        description:
          "The reactor needs the correct power sequence.",
        prompt:
          "2 + 4 = 6\n3 + 5 = 8\n7 + 1 = 8\n\n4 + 6 = ?",
        answer: "10",
        hint:
          "This one is exactly what it looks like.",
        icon: "⚡",
        reward: {
          name: "Power Cell",
          icon: "🔋"
        }
      },

      {
        id: "transmission",
        type: "code",
        title: "Emergency Transmission",
        description:
          "An emergency signal has been detected.",
        prompt:
          "... --- ...",
        answer: "sos",
        hint:
          "The signal uses Morse code.",
        icon: "📻",
        reward: {
          name: "Comms Access",
          icon: "📟"
        }
      },

      {
        id: "airlock",
        type: "final",
        title: "Escape Pod",
        description:
          "The final lock requires the information you discovered.",
        prompt:
          "SOS + 10\n\nCombine the emergency signal\nwith the reactor number.",
        answer: "sos10",
        hint:
          "Use two answers you already discovered.",
        icon: "🚪",
        reward: {
          name: "Escape Access",
          icon: "🚀"
        }
      }
    ]
  },

  {
    code: "ECL-002",
    title: "Black Hole Protocol",
    description:
      "The station has entered a black hole's gravity well. Stabilize the ship before it is pulled apart.",
    icon: "🕳️",
    difficulty: 2,
    timeLimit: 780,

    puzzles: [
      {
        id: "gravity",
        type: "logic",
        title: "Gravity Core",
        description:
          "The gravity core is displaying a strange sequence.",
        prompt:
          "2 → 4\n4 → 8\n8 → 16\n16 → ?",
        answer: "32",
        hint:
          "Each number follows the same operation.",
        icon: "🌀",
        reward: {
          name: "Gravity Stabilizer",
          icon: "🌀"
        }
      },

      {
        id: "coordinates",
        type: "code",
        title: "Lost Coordinates",
        description:
          "The navigation computer needs the missing coordinate.",
        prompt:
          "X: 12\nY: 7\nZ: 19\n\nX + Y = ?",
        answer: "19",
        hint:
          "You only need X and Y.",
        icon: "🧭",
        reward: {
          name: "Coordinates",
          icon: "🧭"
        }
      },

      {
        id: "blackhole",
        type: "pattern",
        title: "Event Horizon",
        description:
          "The event horizon lock needs the correct sequence.",
        prompt:
          "1 - 1 - 2 - 3 - 5 - 8 - ?",
        answer: "13",
        hint:
          "Each number is created from the previous two.",
        icon: "🌌",
        reward: {
          name: "Horizon Key",
          icon: "🔑"
        }
      },

      {
        id: "stabilize",
        type: "final",
        title: "Gravity Override",
        description:
          "Enter the final override code.",
        prompt:
          "Gravity Stabilizer: 32\nCoordinates: 19\n\n32 + 19 = ?",
        answer: "51",
        hint:
          "Combine your two previous answers.",
        icon: "🚨",
        reward: {
          name: "Gravity Override",
          icon: "🚀"
        }
      }
    ]
  },

  {
    code: "ECL-003",
    title: "Signal from Europa",
    description:
      "Something beneath Europa's ice has sent a message. Decode the signal before it disappears.",
    icon: "🪐",
    difficulty: 2,
    timeLimit: 840,

    puzzles: [
      {
        id: "frequency",
        type: "logic",
        title: "Alien Frequency",
        description:
          "Find the missing frequency.",
        prompt:
          "10 MHz\n20 MHz\n30 MHz\n?\n50 MHz",
        answer: "40",
        hint:
          "Look at how the frequencies increase.",
        icon: "📻",
        reward: {
          name: "Signal Frequency",
          icon: "📻"
        }
      },

      {
        id: "message",
        type: "code",
        title: "Unknown Message",
        description:
          "The signal contains a familiar emergency code.",
        prompt:
          ".... . .-.. .-.. ---",
        answer: "hello",
        hint:
          "Decode the Morse symbols.",
        icon: "👽",
        reward: {
          name: "Alien Message",
          icon: "👽"
        }
      },

      {
        id: "ice",
        type: "logic",
        title: "Ice Chamber",
        description:
          "The research door requires the correct temperature.",
        prompt:
          "Temperature sequence:\n\n-20\n-15\n-10\n-5\n?",
        answer: "0",
        hint:
          "The temperature rises by the same amount each time.",
        icon: "🧊",
        reward: {
          name: "Ice Chamber Access",
          icon: "🧊"
        }
      },

      {
        id: "europa",
        type: "final",
        title: "Europa Gateway",
        description:
          "The final gateway requires all three discoveries.",
        prompt:
          "Frequency: 40\nTemperature: 0\nMessage: HELLO\n\nEnter the signal number.",
        answer: "40",
        hint:
          "The gateway only requires the frequency number.",
        icon: "🚪",
        reward: {
          name: "Europa Access",
          icon: "🌌"
        }
      }
    ]
  },

  {
    code: "ECL-004",
    title: "Asteroid Impact",
    description:
      "An asteroid is heading directly toward the station. Calculate the defense sequence.",
    icon: "☄️",
    difficulty: 3,
    timeLimit: 720,

    puzzles: [
      {
        id: "trajectory",
        type: "math",
        title: "Trajectory Calculator",
        description:
          "Calculate the asteroid's next position.",
        prompt:
          "Position: 10\nVelocity: 5\nTime: 4\n\nDistance = Velocity × Time\n\nDistance = ?",
        answer: "20",
        hint:
          "Multiply velocity by time.",
        icon: "📐",
        reward: {
          name: "Trajectory Data",
          icon: "📐"
        }
      },

      {
        id: "defense",
        type: "logic",
        title: "Defense Grid",
        description:
          "Activate the correct defense number.",
        prompt:
          "3 × 3 = 9\n4 × 4 = 16\n5 × 5 = 25\n\n6 × 6 = ?",
        answer: "36",
        hint:
          "Multiply the number by itself.",
        icon: "🛡️",
        reward: {
          name: "Defense Grid",
          icon: "🛡️"
        }
      },

      {
        id: "countdown",
        type: "pattern",
        title: "Impact Countdown",
        description:
          "The countdown system is corrupted.",
        prompt:
          "30 → 25 → 20 → 15 → ?",
        answer: "10",
        hint:
          "The countdown decreases by five.",
        icon: "⏱️",
        reward: {
          name: "Countdown Override",
          icon: "⏱️"
        }
      },

      {
        id: "fire",
        type: "final",
        title: "FIRE DEFENSE",
        description:
          "Enter the final defense code.",
        prompt:
          "Trajectory: 20\nDefense: 36\nCountdown: 10\n\n20 + 36 + 10 = ?",
        answer: "66",
        hint:
          "Add all three previous answers.",
        icon: "🚀",
        reward: {
          name: "Defense Launch",
          icon: "🚀"
        }
      }
    ]
  },

  {
    code: "ECL-005",
    title: "Station Zero",
    description:
      "The final station has entered full lockdown. Every system must be restored before the last escape route closes.",
    icon: "🚨",
    difficulty: 4,
    timeLimit: 900,

    puzzles: [
      {
        id: "captain",
        type: "logic",
        title: "Captain's Console",
        description:
          "The captain left behind a simple sequence.",
        prompt:
          "1\n3\n6\n10\n15\n?",
        answer: "21",
        hint:
          "The difference increases by one each time.",
        icon: "👨‍🚀",
        reward: {
          name: "Captain's Clearance",
          icon: "🪪"
        }
      },

      {
        id: "reactor-zero",
        type: "math",
        title: "Zero Reactor",
        description:
          "The reactor requires the missing value.",
        prompt:
          "8 × 7 = 56\n56 ÷ 7 = ?",
        answer: "8",
        hint:
          "Division reverses multiplication.",
        icon: "⚛️",
        reward: {
          name: "Reactor Clearance",
          icon: "⚛️"
        }
      },

      {
        id: "cipher",
        type: "code",
        title: "Final Cipher",
        description:
          "Decode the station's final message.",
        prompt:
          "UFTU\n\nEvery letter has been shifted +1.\nDecode the message.",
        answer: "test",
        hint:
          "Move every letter one position backwards.",
        icon: "🔐",
        reward: {
          name: "Cipher Key",
          icon: "🔐"
        }
      },

      {
        id: "zero",
        type: "final",
        title: "Station Zero Escape",
        description:
          "This is it. Enter the final override.",
        prompt:
          "Captain: 21\nReactor: 8\nCipher: TEST\n\nFinal code = Captain + Reactor",
        answer: "29",
        hint:
          "The final code uses the first two answers.",
        icon: "🚪",
        reward: {
          name: "STATION ZERO",
          icon: "🏆"
        }
      }
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log("🛰️ Connected to MongoDB");

    await Mission.deleteMany({});

    await Mission.insertMany(missions);

    console.log(
      `🚀 Seeded ${missions.length} missions`
    );

    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();