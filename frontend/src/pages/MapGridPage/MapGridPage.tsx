import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  fetchAllGpsPositions,
  groupPositionsBySession,
  GpsPosition,
} from "../../services/gpsApi";

import { Header } from "../../components/Header/Header";
import { SessionMap } from "../../components/Map/SessionMap";
import { Toggle } from "../../components/Toogle/Toggle";

import "./MapGridPage.scss";

export const MapGridPage: React.FC = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Record<string, GpsPosition[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const loadData = async () => {
    try {
      const positions = await fetchAllGpsPositions();
      const groupedSessions = groupPositionsBySession(positions);
      setSessions(groupedSessions);
    } catch (err) {
      setError("Failed to load GPS data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let countdownInterval: NodeJS.Timeout;

    if (autoRefresh) {
      countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            return 60;
          }
          return prev - 1;
        });
      }, 1000);

      intervalId = setInterval(() => {
        loadData();
      }, 60000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [autoRefresh]);

  if (loading) return <div className="loading">Loading GPS data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <Header
        left={
          <div className="logo-section">
            <h1>GPS Tracking</h1>
            <div className="header-divider"></div>
            <span className="subtitle">Fleet Management</span>
          </div>
        }
        middle={
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-value">{Object.keys(sessions).length}</span>
              <span className="stat-label">Active Sessions</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {Object.values(sessions).reduce(
                  (total, positions) => total + positions.length,
                  0,
                )}
              </span>
              <span className="stat-label">Total Points</span>
            </div>
          </div>
        }
        right={
          <Toggle
            checked={autoRefresh}
            onChange={setAutoRefresh}
            label={`Auto-refresh ${autoRefresh ? `(${countdown}s)` : ""}`}
          />
        }
      />
      <div className="map-grid">
        {Object.entries(sessions).map(([sessionId, positions]) => (
          <SessionMap
            key={sessionId}
            sessionId={sessionId}
            positions={positions}
            onClick={() => navigate(`/session/${sessionId}`)}
          />
        ))}
      </div>
    </>
  );
};
