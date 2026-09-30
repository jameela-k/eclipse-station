import React from 'react'
import {
  Link
} from "react-router-dom";

export default function Home() {
  return (
    <main className="landing">
      <div className="stars" />

      <section className="hero">

        <div className="planet">
          🪐
        </div>

        <p className="eyebrow">
          ECLIPSE STATION // CLASSIFIED
        </p>

        <h1>
          ECLIPSE
        </h1>

        <h2>
          STATION
        </h2>

        <p className="hero-copy">
          Five missions. Twenty puzzles.
          One question:
          <br />
          <strong>Can you escape?</strong>
        </p>

        <div className="hero-actions">

          <Link
            className="button primary"
            to="/missions"
          >
            ENTER STATION
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