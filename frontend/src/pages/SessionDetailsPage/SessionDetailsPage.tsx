import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapLayerMouseEvent } from "react-map-gl";

import {
  fetchGpsPositionsBySession,
  GpsPosition,
  formatTimestamp,
} from "../../services/gpsApi";

import { Header } from "../../components/Header/Header";
import { Toggle } from "../../components/Toogle/Toggle";
import { PointDetailModal } from "../../components/PointDetailModal/PointDetailModal";
import { SessionStats } from "../../components/SessionStats/SessionStats";
import { PositionsTable } from "../../components/PositionsTable/PositionsTable";
import { SessionDetailsMap } from "../../components/Map/SessionDetailsMap";

import "./SessionDetailsPage.scss";

interface ClickedPointData {
  id: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

export const SessionDetailsPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [positions, setPositions] = useState<GpsPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllPoints, setShowAllPoints] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPointData, setSelectedPointData] = useState<ClickedPointData | null>(null);

  useEffect(() => {
    const loadSessionData = async () => {
      if (!sessionId) return;

      try {
        const data = await fetchGpsPositionsBySession(sessionId);
        setPositions(data);
      } catch (err) {
        setError("Failed to load session data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadSessionData();
  }, [sessionId]);

  if (!sessionId) return <div className="error">Invalid session ID</div>;
  if (loading) return <div className="loading">Loading session data...</div>;
  if (error) return <div className="error">{error}</div>;
  if (positions.length === 0) return <div className="error">No data available for this session</div>;

  const startTime = formatTimestamp(positions[0].timestamp);
  const endTime = formatTimestamp(positions[positions.length - 1].timestamp);
  const duration = Math.round(
    (new Date(positions[positions.length - 1].timestamp).getTime() -
      new Date(positions[0].timestamp).getTime()) /
      1000
  );

  const handlePointClick = (event: MapLayerMouseEvent) => {
    const features = event.features;
    if (features && features.length > 0) {
      const clickedPoint = features.find((f) => f.layer?.id === "points");

      if (clickedPoint && clickedPoint.properties) {
        const { id, latitude, longitude, timestamp } = clickedPoint.properties;
        setSelectedPointData({
          id,
          latitude,
          longitude,
          timestamp: formatTimestamp(timestamp),
        });
        setIsModalOpen(true);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPointData(null);
  };

  return (
    <div className="session-detail">
      <Header
        left={
          <button className="back-button" onClick={() => navigate("/")}>
            ← Back to Grid
          </button>
        }
        middle={<h3>Session {sessionId}</h3>}
        right={
          <Toggle
            checked={showAllPoints}
            onChange={setShowAllPoints}
            label={showAllPoints ? "Show All Points" : "Show Start/End Only"}
          />
        }
      />

      <div className="session-content">
        <SessionStats
          startTime={startTime}
          endTime={endTime}
          duration={duration}
          totalPoints={positions.length}
        />

        <SessionDetailsMap
          positions={positions}
          showAllPoints={showAllPoints}
          onPointClick={handlePointClick}
        />

        <PositionsTable positions={positions} />
      </div>

      <PointDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={selectedPointData}
      />
    </div>
  );
};
