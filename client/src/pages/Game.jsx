import React from 'react'
import {
  useCallback,
  useEffect,
  useState
} from "react";

import {
  Link,
  useNavigate,
  useParams
} from "react-router-dom";

import { api } from "../services/api";

import Timer from "../components/Timer";
import Inventory from "../components/Inventory";
import PuzzleModal from "../components/PuzzleModal";

export default function Game() {

  const { missionId } =
    useParams();

  const navigate =
    useNavigate();

  const [mission, setMission] =
    useState(null);

  const [attempt, setAttempt] =
    useState(null);

  const [timeLeft, setTimeLeft] =
    useState(0);

  const [solved, setSolved] =
    useState([]);

  const [inventory, setInventory] =
    useState([]);

  const [activePuzzle, setActivePuzzle] =
    useState(null);

  const [hint, setHint] =
    useState("");

  const [hints, setHints] =
    useState(0);

  const [aria, setAria] =
    useState(
      "ARIA: Station lockdown activated. Find a way to escape."
    );

  const [error, setError] =
    useState("");

  useEffect(() => {

    async function load() {

      try {

        const studentName =
          localStorage.getItem(
            "eclipseStudentName"
          ) ||
          "Anonymous Cadet";

        const missionData =
          await api.getMission(
            missionId
          );

        const attemptData =
          await api.startAttempt({
            missionId,
            studentName
          });

        setMission(
          missionData
        );

        setAttempt(
          attemptData
        );

        setTimeLeft(
          missionData.timeLimit
        );

      } catch (err) {

        setError(
          err.message
        );

      }
    }

    load();

  }, [missionId]);

  const tick = useCallback(() => {

    setTimeLeft(
      (value) =>
        Math.max(
          0,
          value - 1
        )
    );

  }, []);

  useEffect(() => {

    if (
      timeLeft === 0 &&
      attempt &&
      mission
    ) {

      api.submitAttempt(
        attempt._id,
        {
          timeRemaining: 0,
          completed: false
        }
      )
        .then((result) => {
          navigate(
            `/results/${result._id}`
          );
        })
        .catch(() => { });

    }

  }, [
    timeLeft,
    attempt,
    mission,
    navigate
  ]);

  function openPuzzle(puzzle) {

    setHint("");

    if (
      solved.includes(
        puzzle.id
      )
    ) {

      setAria(
        "ARIA: This system has already been restored."
      );

      return;
    }

    const index =
      mission.puzzles.findIndex(
        (item) =>
          item.id === puzzle.id
      );

    if (
      index > 0 &&
      !solved.includes(
        mission.puzzles[
          index - 1
        ].id
      )
    ) {

      setAria(
        "ARIA: Previous system must be restored first."
      );

      return;
    }

    setActivePuzzle(
      puzzle
    );
  }

  async function solvePuzzle(
    answer
  ) {

    if (!activePuzzle) {
      return;
    }

    try {

      const result =
        await api.submitPuzzle(
          attempt._id,
          {
            puzzleId:
              activePuzzle.id,
            answer
          }
        );

      if (!result.correct) {

        setAria(
          "ARIA: Incorrect solution. The station disagrees."
        );

        return;
      }

      const nextSolved = [
        ...solved,
        activePuzzle.id
      ];

      setSolved(
        nextSolved
      );

      setInventory(
        (items) => [
          ...items,
          result.reward
        ]
      );

      setAria(
        `ARIA: Correct. ${activePuzzle.title} has been restored.`
      );

      setActivePuzzle(null);
      setHint("");

      if (
        nextSolved.length ===
        mission.puzzles.length
      ) {

        const finalResult =
          await api.submitAttempt(
            attempt._id,
            {
              timeRemaining:
                timeLeft,
              completed: true
            }
          );

        navigate(
          `/results/${finalResult._id}`
        );
      }

    } catch (err) {

      setError(
        err.message
      );

    }
  }

  async function useHint() {

    try {

      const result =
        await api.getHint(
          attempt._id,
          {
            puzzleId:
              activePuzzle.id
          }
        );

      setHints(
        result.hintsUsed
      );

      setHint(
        result.hint
      );

      setAria(
        "ARIA: Hint transmitted. Good luck, cadet."
      );

    } catch (err) {

      setError(
        err.message
      );

    }
  }

  if (error) {
    return (
      <main className="page center">
        <p className="error">
          {error}
        </p>
      </main>
    );
  }

  if (!mission) {
    return (
      <main className="page center">
        <p>
          Loading mission...
        </p>
      </main>
    );
  }

  return (
    <main className="game">

      <div className="stars" />

      <header className="game-hud">

        <Link to="/missions">
          ← MISSIONS
        </Link>

        <strong>
          ◉{" "}
          {mission.title.toUpperCase()}
        </strong>

        <span>
          O₂ 100%
        </span>

        <Timer
          timeLeft={timeLeft}
          onTick={tick}
        />

      </header>

      <section className="station">

        <div className="space-window">

          <div className="planet-large" />

          <span>
            SECTOR 07 //
            UNKNOWN ORBIT
          </span>

        </div>

        {mission.puzzles.map(
          (puzzle, index) => (

            <button
              className={`station-object object-${index + 1
                } ${solved.includes(
                  puzzle.id
                )
                  ? "solved"
                  : ""
                }`}
              key={puzzle.id}
              onClick={() =>
                openPuzzle(puzzle)
              }
            >

              <span>
                {puzzle.icon}
              </span>

              <small>
                {puzzle.title}
              </small>

              {solved.includes(
                puzzle.id
              ) && (
                  <b>✓</b>
                )}

            </button>

          )
        )}

        <div className="floor" />

      </section>

      <section className="game-bottom">

        <div className="panel aria">

          <div className="aria-avatar">
            AI
          </div>

          <div>

            <span className="panel-title">
              ARIA // STATION AI
            </span>

            <p>
              {aria}
            </p>

          </div>

        </div>

        <Inventory
          items={inventory}
        />

      </section>

      <div className="hint-count">
        HINTS USED: {hints}
      </div>

      <PuzzleModal
        puzzle={activePuzzle}
        hint={hint}
        onClose={() =>
          setActivePuzzle(null)
        }
        onSolve={solvePuzzle}
        onHint={useHint}
      />

    </main>
  );
}