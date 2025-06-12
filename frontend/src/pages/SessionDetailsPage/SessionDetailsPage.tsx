import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Map, Source, Layer, MapLayerMouseEvent } from "react-map-gl";
import type { Feature, LineString, FeatureCollection, Point } from "geojson";

import {
  fetchGpsPositionsBySession,
  GpsPosition,
  formatTimestamp,
} from "../../services/gpsApi";

import { MAP_ACCESS_TOKEN } from "../../constants";
import { lineLayer, pointLayer } from "../../components/Map/mapConfig"; // Assuming these are in mapConfig.ts
import { Header } from "../../components/Header/Header";
import { Toggle } from "../../components/Toogle/Toggle";
import { PointDetailModal } from "../../components/PointDetailModal/PointDetailModal"; // Import the new modal component

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
  const [selectedPointData, setSelectedPointData] =
    useState<ClickedPointData | null>(null);

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
  if (positions.length === 0)
    return <div className="error">No data available for this session</div>;

  const bounds = positions.reduce(
    (acc, pos) => ({
      minLng: Math.min(acc.minLng, pos.longitude),
      maxLng: Math.max(acc.maxLng, pos.longitude),
      minLat: Math.min(acc.minLat, pos.latitude),
      maxLat: Math.max(acc.maxLat, pos.latitude),
    }),
    {
      minLng: positions[0].longitude,
      maxLng: positions[0].longitude,
      minLat: positions[0].latitude,
      maxLat: positions[0].latitude,
    },
  );

  const startTime = formatTimestamp(positions[0].timestamp);
  const endTime = formatTimestamp(positions[positions.length - 1].timestamp);
  const duration = Math.round(
    (new Date(positions[positions.length - 1].timestamp).getTime() -
      new Date(positions[0].timestamp).getTime()) /
      1000,
  );

  // Create GeoJSON line for the track
  const trackData: Feature<LineString> = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: positions.map((pos) => [pos.longitude, pos.latitude]),
    },
  };

  const pointsData: FeatureCollection<Point> = {
    type: "FeatureCollection",
    features: showAllPoints
      ? positions.map((pos) => ({
          type: "Feature",
          properties: {
            id: pos.id,
            timestamp: pos.timestamp,
            latitude: pos.latitude,
            longitude: pos.longitude,
          },
          geometry: {
            type: "Point",
            coordinates: [pos.longitude, pos.latitude],
          },
        }))
      : [
          {
            type: "Feature",
            properties: {
              type: "start",
              id: positions[0].id,
              timestamp: positions[0].timestamp,
              latitude: positions[0].latitude,
              longitude: positions[0].longitude,
            },
            geometry: {
              type: "Point",
              coordinates: [positions[0].longitude, positions[0].latitude],
            },
          },
          // Last point
          {
            type: "Feature",
            properties: {
              type: "end",
              id: positions[positions.length - 1].id,
              timestamp: positions[positions.length - 1].timestamp,
              latitude: positions[positions.length - 1].latitude,
              longitude: positions[positions.length - 1].longitude,
            },
            geometry: {
              type: "Point",
              coordinates: [
                positions[positions.length - 1].longitude,
                positions[positions.length - 1].latitude,
              ],
            },
          },
        ],
  };

  const handlePointClick = (event: MapLayerMouseEvent) => {
    const features = event.features;
    if (features && features.length > 0) {
      const clickedPoint = features.find((f) => f.layer?.id === pointLayer.id);

      if (clickedPoint && clickedPoint.properties) {
        const { id, latitude, longitude, timestamp, imageUrl } =
          clickedPoint.properties;
        setSelectedPointData({
          id,
          latitude,
          longitude,
          timestamp: formatTimestamp(timestamp), // Format here for display
        });
        setIsModalOpen(true); // Open the modal
      }
    }
  }; // `formatTimestamp` is a dependency

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPointData(null); // Clear data when closing
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
            <p>{positions.length}</p>
          </div>
        </div>

        <div className="map-container-details">
          <Map
            mapboxAccessToken={MAP_ACCESS_TOKEN}
            initialViewState={{
              bounds: [
                [bounds.minLng, bounds.minLat],
                [bounds.maxLng, bounds.maxLat],
              ],
              fitBoundsOptions: { padding: 50 },
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/light-v11"
            interactiveLayerIds={[pointLayer.id!]}
            onClick={handlePointClick}
          >
            <Source type="geojson" data={trackData}>
              <Layer {...lineLayer} />
            </Source>
            <Source type="geojson" data={pointsData}>
              <Layer {...pointLayer} />
            </Source>
          </Map>
        </div>

        <div className="positions-table">
          <h2>Position History</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((position) => (
                  <tr key={position.id}>
                    <td>{formatTimestamp(position.timestamp)}</td>
                    <td>{position.latitude.toFixed(6)}</td>
                    <td>{position.longitude.toFixed(6)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <PointDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={selectedPointData}
      />
    </div>
  );
};
