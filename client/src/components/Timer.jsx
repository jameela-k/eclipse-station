import React from 'react'
import { useEffect } from "react";

export default function Timer({
  timeLeft,
  onTick
}) {

  useEffect(() => {

    if (timeLeft <= 0) {
      return;
    }

    const timer =
      setInterval(
        onTick,
        1000
      );

    return () =>
      clearInterval(timer);

  }, [
    timeLeft,
    onTick
  ]);

  const minutes =
    Math.floor(
      timeLeft / 60
    )
      .toString()
      .padStart(2, "0");

  const seconds =
    (timeLeft % 60)
      .toString()
      .padStart(2, "0");

  return (
    <div
      className={`timer ${timeLeft < 60
        ? "danger"
        : ""
        }`}
    >
      ⏱ {minutes}:{seconds}
    </div>
  );
}