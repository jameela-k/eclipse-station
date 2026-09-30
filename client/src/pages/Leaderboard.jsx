import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import { api } from "../services/api";

export default function Leaderboard() {

  const [rows, setRows] =
    useState([]);

  useEffect(() => {

    api.getLeaderboard()
      .then(setRows)
      .catch(() => { });

  }, []);

  return (
    <main className="page">

      <header className="topbar">

        <Link to="/">
          ← ECLIPSE
        </Link>

        <Link to="/missions">
          MISSIONS
        </Link>

      </header>

      <section className="content narrow">

        <p className="eyebrow">
          MISSION CONTROL
        </p>

        <h1>
          Space Cadets
        </h1>

        <p className="muted">
          The station remembers who escaped.
        </p>

        <div className="leaderboard">

          {rows.length === 0 && (
            <p className="muted">
              No completed missions yet.
            </p>
          )}

          {rows.map(
            (row, index) => (

              <div
                className="leader-row"
                key={row._id}
              >

                <strong>
                  #{index + 1}
                </strong>

                <div>
                  <span>
                    {row.studentName}
                  </span>

                  <small>
                    {row.missionId?.title}
                  </small>
                </div>

                <b>
                  {row.score} XP
                </b>

              </div>

            )
          )}

        </div>

      </section>

    </main>
  );
}