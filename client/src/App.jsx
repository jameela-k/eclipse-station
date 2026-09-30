import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Missions from './pages/Missions'
import Game from './pages/Game'
import Results from './pages/Results'
import Leaderboard from './pages/Leaderboard'

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/missions"
        element={<Missions />}
      />

      <Route
        path="/game/:missionId"
        element={<Game />}
      />

      <Route
        path="/results/:attemptId"
        element={<Results />}
      />

      <Route
        path="/leaderboard"
        element={<Leaderboard />}
      />
    </Routes>
  )
}