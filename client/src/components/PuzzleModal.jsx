import React from 'react'
import {
  useState
} from "react";

export default function PuzzleModal({
  puzzle,
  onClose,
  onSolve,
  onHint,
  hint
}) {

  const [answer, setAnswer] =
    useState("");

  if (!puzzle) {
    return null;
  }

  function submit() {
    if (!answer.trim()) {
      return;
    }

    onSolve(answer);
    setAnswer("");
  }

  return (
    <div className="modal-backdrop">

      <section className="modal">

        <button
          className="close"
          onClick={onClose}
        >
          ×
        </button>

        <p className="eyebrow">
          PUZZLE //
          {" "}
          {puzzle.type.toUpperCase()}
        </p>

        <h2>
          {puzzle.title}
        </h2>

        <p className="muted">
          {puzzle.description}
        </p>

        <div className="terminal">

          <div className="terminal-label">
            SYSTEM OUTPUT
          </div>

          <pre>
            {puzzle.prompt}
          </pre>

        </div>

        {hint && (
          <div className="hint-box">
            💡 {hint}
          </div>
        )}

        <input
          autoFocus
          className="answer"
          value={answer}
          onChange={(e) =>
            setAnswer(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submit();
            }
          }}
          placeholder="ENTER SOLUTION..."
        />

        <div className="modal-actions">

          <button
            className="button ghost"
            onClick={onHint}
          >
            💡 HINT
          </button>

          <button
            className="button primary"
            onClick={submit}
          >
            SUBMIT
          </button>

        </div>

      </section>

    </div>
  );
}