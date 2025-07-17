// src/components/Leaderboard.jsx
import React from "react";

export default function Leaderboard({ scores }) {
  const sorted = [...scores].sort((a, b) => b.points - a.points);

  return (
    <div className="leaderboard">
      {sorted.map((user, index) => (
        <div key={user.name} className="entry">
          <span className="rank">{index + 1}.</span>
          <img src={user.photo} alt={user.name} className="avatar" />
          <span className="name">{user.name}</span>
          <span className="team">{user.team}</span>
          <span className="points">{user.points} pts</span>
        </div>
      ))}
    </div>
  );
}
