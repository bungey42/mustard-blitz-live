import React, { useEffect, useState } from "react";
import Leaderboard from "./components/Leaderboard";
import TeamLeaderboard from "./components/TeamLeaderboard";
import Timer from "./components/Timer";
import AdminPanel from "./components/AdminPanel";
import "./styles.css";

export default function App() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch("/scores.json")
      .then((res) => res.json())
      .then((data) => setScores(data));
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <img src="/logo.png" alt="Mustard Logo" className="logo" />
        <Timer />
      </header>
      <main className="leaderboard-layout">
        <div className="leaderboard-section">
          <h2>Individual Leaderboard</h2>
          <Leaderboard scores={scores} />
        </div>
        <div className="leaderboard-section">
          <h2>Team Leaderboard</h2>
          <TeamLeaderboard scores={scores} />
        </div>
      </main>
      <footer>
        <AdminPanel onScoreUpdate={setScores} />
      </footer>
    </div>
  );
}
