import React from 'react'
import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import { api } from "../services/api";

export default function Missions() {

  const [missions, setMissions] =
    useState([]);

  const [name, setName] =
    useState(
      localStorage.getItem(
        "eclipseStudentName"
      ) || ""
    );

  const [error, setError] =
    useState("");

  useEffect(() => {
    api.getMissions()
      .then(setMissions)
      .catch((err) =>
        setError(err.message)
      );
  }, []);

  function saveName() {
    if (!name.trim()) {
      setError(
        "Enter your space cadet name first."
      );
      return;
    }

    localStorage.setItem(
      "eclipseStudentName",
      name.trim()
    );

    setError("");
  }

  return (
    <main className="page">

      <header className="topbar">
        <Link to="/">
          ← ECLIPSE
        </Link>

        <Link to="/leaderboard">
          LEADERBOARD
        </Link>
      </header>

      <section className="content">

        <p className="eyebrow">
          MISSION CONTROL
        </p>

        <h1>
          Choose Your Mission
        </h1>

        <p className="muted">
          Every room contains clues,
          puzzles and one way out.
        </p>

        <div className="name-panel panel">

          <div>
            <span className="panel-title">
              👨‍🚀 SPACE CADET ID
            </span>

            <p className="muted">
              This name will appear on
              the leaderboard.
            </p>
          </div>

          <div className="name-input">
            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter your name..."
              maxLength={50}
            />

            <button
              className="button primary"
              onClick={saveName}
            >
              SAVE
            </button>
          </div>

        </div>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <div className="mission-grid">

          {missions.map(
            (mission, index) => (

              <article
                className="mission-card"
                key={mission._id}
              >

                <span className="mission-number">
                  0{index + 1}
                </span>

                <span className="mission-icon">
                  {mission.icon}
                </span>

                <p className="mission-code">
                  {mission.code}
                </p>

                <h2>
                  {mission.title}
                </h2>

                <p>
                  {mission.description}
                </p>

                <div className="mission-meta">

                  <span>
                    ⏱{" "}
                    {Math.floor(
                      mission.timeLimit / 60
                    )}{" "}
                    MIN
                  </span>

                  <span>
                    ★ LEVEL{" "}
                    {mission.difficulty}
                  </span>

                </div>

                <Link
                  className="button primary full"
                  to={`/game/${mission._id}`}
                  onClick={saveName}
                >
                  ENTER ROOM
                </Link>

              </article>

            )
          )}

        </div>

      </section>
    </main>
  );
}