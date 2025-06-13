import React from "react";
import { Map, Source, Layer, MapLayerMouseEvent } from "react-map-gl";
import type { Feature, LineString, FeatureCollection, Point } from "geojson";
import { GpsPosition } from "../../services/gpsApi";
import { MAP_ACCESS_TOKEN } from "../../constants";
import { lineLayer, pointLayer } from "./mapConfig";
import "./SessionDetailsMap.scss";

interface SessionDetailsMapProps {
  positions: GpsPosition[];
  showAllPoints: boolean;
  onPointClick: (event: MapLayerMouseEvent) => void;
}

interface MapBounds {
  minLng: number;
  maxLng: number;
  minLat: number;
  maxLat: number;
}

const calculateBounds = (positions: GpsPosition[]): MapBounds => {
  return positions.reduce(
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
};

const createTrackData = (positions: GpsPosition[]): Feature<LineString> => ({
  type: "Feature",
  properties: {},
  geometry: {
    type: "LineString",
    coordinates: positions.map((pos) => [pos.longitude, pos.latitude]),
  },
});

const createPointsData = (
  positions: GpsPosition[],
  showAllPoints: boolean,
): FeatureCollection<Point> => ({
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
});

export const SessionDetailsMap: React.FC<SessionDetailsMapProps> = ({
  positions,
  showAllPoints,
  onPointClick,
}) => {
  const bounds = calculateBounds(positions);
  const trackData = createTrackData(positions);
  const pointsData = createPointsData(positions, showAllPoints);

  return (
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
        onClick={onPointClick}
      >
        <Source type="geojson" data={trackData}>
          <Layer {...lineLayer} />
        </Source>
        <Source type="geojson" data={pointsData}>
          <Layer {...pointLayer} />
        </Source>
      </Map>
    </div>
  );
};
