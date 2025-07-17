import React, { useEffect, useState } from 'react';

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(0);

useEffect(() => {
  const now = new Date();
  const endTime = new Date();
  endTime.setHours(16, 30, 0, 0); // Set to 16:30 today

  // If it's already past 16:30, roll over to tomorrow
  if (now.getTime() > endTime.getTime()) {
    endTime.setDate(endTime.getDate() + 1);
  }

  const interval = setInterval(() => {
    const currentTime = new Date().getTime();
    const diff = endTime.getTime() - currentTime;
    setTimeLeft(diff > 0 ? diff : 0);
  }, 1000);

  return () => clearInterval(interval);
}, []);


  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return <div>⏰ Time Left: {formatTime(timeLeft)}</div>;
}