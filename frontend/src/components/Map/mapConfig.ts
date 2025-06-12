export const lineLayer = {
  id: "route",
  type: "line" as const,
  paint: {
    "line-color": "grey",
    "line-width": 2,
    "line-opacity": 0.8,
  },
};

export const pointLayer = {
  id: "points",
  type: "circle" as const,
  paint: {
    "circle-radius": 4,
    "circle-color": "#0066ff",
    "circle-stroke-width": 2,
    "circle-stroke-color": "#ffffff",
  },
};
