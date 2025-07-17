
import React, { useState, useEffect } from "react";

const actions = {
  "Perm Job Added": 1,
  "Contract Job Added": 2,
  "Client Meeting Booked": 3,
  "LinkedIn Post": 1,
  "Perm Candidate Interview": 1,
  "Contract Candidate Interview": 2,
  "3 CVs": 1,
  "Custom Adjustment": null,
};

export default function AdminPanel({ onScoreUpdate }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [customPoints, setCustomPoints] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  const handleLogin = async () => {
    if (password === "admin123") {
      setIsAdmin(true);
      const res = await fetch("/scores.json");
      const data = await res.json();
      setAllUsers(data);
    } else {
      alert("Invalid password");
    }
  };

  const handleAddPoints = () => {
    let points;
    if (selectedAction === "Custom Adjustment") {
      points = parseInt(customPoints, 10);
      if (isNaN(points)) return alert("Enter a valid number for custom points");
    } else {
      points = actions[selectedAction];
    }

    const updated = allUsers.map((user) =>
      user.name === selectedUser
        ? { ...user, points: user.points + points }
        : user
    );

    setAllUsers(updated);
    onScoreUpdate(updated);
    setCustomPoints("");
    setSelectedUser("");
    setSelectedAction("");
  };

  if (!isAdmin) {
    return (
      <div className="admin-panel">
        <label>
          <span role="img" aria-label="lock">🔐</span> Admin Login
        </label>
        <br />
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <p>✅ Admin access granted</p>
      <div style={{ marginTop: "1rem" }}>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">Select user</option>
          {allUsers.map((user) => (
            <option key={user.name} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>

        <select value={selectedAction} onChange={(e) => setSelectedAction(e.target.value)}>
          <option value="">Select action</option>
          {Object.keys(actions).map((action) => (
            <option key={action} value={action}>
              {action}
            </option>
          ))}
        </select>

        {selectedAction === "Custom Adjustment" && (
          <input
            type="number"
            placeholder="Enter custom points"
            value={customPoints}
            onChange={(e) => setCustomPoints(e.target.value)}
          />
        )}

        <button
          onClick={handleAddPoints}
          disabled={!selectedUser || !selectedAction || (selectedAction === "Custom Adjustment" && !customPoints)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
