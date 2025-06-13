import React from "react";
import { Map, Source, Layer } from "react-map-gl";
import type { Feature, LineString } from "geojson";
import { GpsPosition, formatTimestamp } from "../../services/gpsApi";
import { MAP_ACCESS_TOKEN, MAP_STYLE } from "../../constants";
import { lineLayer, pointLayer } from "./mapConfig";

import "./SessionMap.scss";

interface SessionMapProps {
  sessionId: string;
  positions: GpsPosition[];
  onClick: () => void;
}

export const SessionMap: React.FC<SessionMapProps> = ({
  sessionId,
  positions,
  onClick,
}) => {
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

  return (
    <div key={sessionId} className="map-container" onClick={onClick}>
      <Map
        mapboxAccessToken={MAP_ACCESS_TOKEN}
        initialViewState={{
          bounds: [
            [bounds.minLng, bounds.minLat],
            [bounds.maxLng, bounds.maxLat],
          ],
          fitBoundsOptions: { padding: 50 },
        }}
        style={{ width: "100%", height: "65%" }}
        mapStyle={MAP_STYLE}
      >
        <Source type="geojson" data={trackData}>
          <Layer {...lineLayer} />
        </Source>
        {positions.map((pos, index) => (
          <Source
            key={index}
            type="geojson"
            data={{
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: [pos.longitude, pos.latitude],
              },
            }}
          >
            <Layer {...pointLayer} />
          </Source>
        ))}
      </Map>
      <div className="session-info">
        <div className="session-header">Session {sessionId}</div>
        <div className="session-details">
          <div className="time-range">
            <span>{startTime}</span>
            <span className="separator">→</span>
            <span>{endTime}</span>
          </div>
          <div className="duration">Duration: {duration} seconds</div>
        </div>
      </div>
    </div>
  );
};
