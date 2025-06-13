import React from "react";
import "./SessionStats.scss";

export interface SessionStatsProps {
  startTime: string;
  endTime: string;
  duration: number;
  totalPoints: number;
}

export const SessionStats: React.FC<SessionStatsProps> = ({
  startTime,
  endTime,
  duration,
  totalPoints,
}) => (
  <div className="session-stats">
    <div className="stat-card">
      <h3>Start Time</h3>
      <p>{startTime}</p>
    </div>
    <div className="stat-card">
      <h3>End Time</h3>
      <p>{endTime}</p>
    </div>
    <div className="stat-card">
      <h3>Duration</h3>
      <p>{duration} seconds</p>
    </div>
    <div className="stat-card">
      <h3>Total Points</h3>
      <p>{totalPoints}</p>
    </div>
  </div>
);
