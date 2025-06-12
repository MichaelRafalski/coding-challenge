import { API_BASE_URL } from "../constants";

export interface GpsPosition {
  id: number;
  latitude: number;
  longitude: number;
  timestamp: string;
  sessionId: string;
}

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

export const fetchAllGpsPositions = async (): Promise<GpsPosition[]> => {
  const response = await fetch(`${API_BASE_URL}/gps-position`);
  if (!response.ok) {
    throw new Error("Failed to fetch GPS positions");
  }
  return response.json();
};

export const fetchGpsPositionsBySession = async (
  sessionId: string,
): Promise<GpsPosition[]> => {
  const response = await fetch(`${API_BASE_URL}/gps-position/${sessionId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch GPS positions for session");
  }
  return response.json();
};

export const groupPositionsBySession = (
  positions: GpsPosition[],
): Record<string, GpsPosition[]> => {
  return positions.reduce(
    (acc, position) => {
      const { sessionId } = position;
      if (!acc[sessionId]) {
        acc[sessionId] = [];
      }
      acc[sessionId].push(position);
      return acc;
    },
    {} as Record<string, GpsPosition[]>,
  );
};
