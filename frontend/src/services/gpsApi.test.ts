import { groupPositionsBySession, GpsPosition } from "./gpsApi";

describe("groupPositionsBySession", () => {
  it("should group positions by session ID", () => {
    const mockPositions: GpsPosition[] = [
      {
        id: 1,
        latitude: 40.7128,
        longitude: -74.006,
        timestamp: "2024-03-20T10:00:00Z",
        sessionId: "session1",
      },
      {
        id: 2,
        latitude: 40.7129,
        longitude: -74.0061,
        timestamp: "2024-03-20T10:01:00Z",
        sessionId: "session1",
      },
      {
        id: 3,
        latitude: 40.713,
        longitude: -74.0062,
        timestamp: "2024-03-20T10:02:00Z",
        sessionId: "session2",
      },
    ];

    const result = groupPositionsBySession(mockPositions);

    expect(Object.keys(result)).toHaveLength(2);
    expect(result["session1"]).toHaveLength(2);
    expect(result["session2"]).toHaveLength(1);
    expect(result["session1"][0].id).toBe(1);
    expect(result["session1"][1].id).toBe(2);
    expect(result["session2"][0].id).toBe(3);
  });

  it("should return empty object for empty input array", () => {
    const result = groupPositionsBySession([]);
    expect(result).toEqual({});
  });

  it("should handle positions with different session IDs", () => {
    const mockPositions: GpsPosition[] = [
      {
        id: 1,
        latitude: 40.7128,
        longitude: -74.006,
        timestamp: "2024-03-20T10:00:00Z",
        sessionId: "session1",
      },
      {
        id: 2,
        latitude: 40.7129,
        longitude: -74.0061,
        timestamp: "2024-03-20T10:01:00Z",
        sessionId: "session2",
      },
      {
        id: 3,
        latitude: 40.713,
        longitude: -74.0062,
        timestamp: "2024-03-20T10:02:00Z",
        sessionId: "session3",
      },
    ];

    const result = groupPositionsBySession(mockPositions);

    expect(Object.keys(result)).toHaveLength(3);
    expect(result["session1"]).toHaveLength(1);
    expect(result["session2"]).toHaveLength(1);
    expect(result["session3"]).toHaveLength(1);
  });

  it("should preserve all position data when grouping", () => {
    const mockPositions: GpsPosition[] = [
      {
        id: 1,
        latitude: 40.7128,
        longitude: -74.006,
        timestamp: "2024-03-20T10:00:00Z",
        sessionId: "session1",
      },
    ];

    const result = groupPositionsBySession(mockPositions);

    expect(result["session1"][0]).toEqual(mockPositions[0]);
  });
});
