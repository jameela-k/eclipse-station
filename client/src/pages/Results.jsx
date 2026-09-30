import React from 'react'
import {
  useEffect,
  useState
} from "react";

import {
  Link,
  useParams
} from "react-router-dom";

import { api } from "../services/api";

export default function Results() {

  const { attemptId } =
    useParams();

  const [result, setResult] =
    useState(null);

  useEffect(() => {

    api.getAttempt(
      attemptId
    )
      .then(setResult)
      .catch(() =>
        setResult({
          completed: false,
          score: 0
        })
      );

  }, [attemptId]);

  if (!result) {
    return (
      <main className="page center">
        Loading result...
      </main>
    );
  }

  return (
    <main className="result page">

      <div className="stars" />

      <section className="result-card">

        <div className="result-icon">
          {result.completed
            ? "🚀"
            : "☠️"}
        </div>

        <p className="eyebrow">
          {result.completed
            ? "MISSION COMPLETE"
            : "SIGNAL LOST"}
        </p>

        <h1>
          {result.completed
            ? "YOU ESCAPED"
            : "MISSION FAILED"}
        </h1>

        <p className="muted">

          {result.completed
            ? "Eclipse Station has been successfully evacuated."
            : "The station has gone silent. Try again, cadet."}

        </p>

        <div className="score-box">

          <span>
            SCORE
          </span>

          <strong>
            {result.score}
          </strong>

          <small>
            XP
          </small>

        </div>

        <div className="result-stats">

          <div>
            <span>
              MISSION
            </span>

            <strong>
              {result.missionId?.title ||
                "Unknown"}
            </strong>
          </div>

          <div>
            <span>
              HINTS
            </span>

            <strong>
              {result.hintsUsed}
            </strong>
          </div>

        </div>

        <div className="hero-actions">

          <Link
            className="button primary"
            to="/missions"
          >
            MORE MISSIONS
          </Link>

          <Link
            className="button ghost"
            to="/leaderboard"
          >
            LEADERBOARD
          </Link>

        </div>

      </section>

    </main>
  );
}