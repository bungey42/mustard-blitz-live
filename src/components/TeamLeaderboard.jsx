// src/components/TeamLeaderboard.jsx
import React from "react";

export default function TeamLeaderboard({ scores }) {
  // Aggregate team scores
  const teamMap = {};

  scores.forEach((user) => {
    const team = user.team;
    if (!teamMap[team]) {
      teamMap[team] = {
        team: team,
        team_photo: user.team_photo,
        totalPoints: 0,
        memberCount: 0,
      };
    }
    teamMap[team].totalPoints += user.points;
    teamMap[team].memberCount += 1;
  });

  const teams = Object.values(teamMap).map((team) => ({
    ...team,
    averagePoints:
      team.memberCount > 0 ? team.totalPoints / team.memberCount : 0,
  }));

  const sortedTeams = teams.sort((a, b) => b.averagePoints - a.averagePoints);

  return (
    <ul className="leaderboard">
      {sortedTeams.map((team, index) => (
        <li key={team.team} className="leaderboard-item">
          <span className="rank">{index + 1}.</span>
          <img
            src={team.team_photo}
            alt={team.team}
            className="avatar"
            style={{ width: 32, height: 32 }}
          />
          <span className="name">{team.team}</span>
          <span className="points">{Math.round(team.averagePoints)} pts</span>
        </li>
      ))}
    </ul>
  );
}
