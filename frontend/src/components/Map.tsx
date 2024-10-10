import React from 'react'
import { Map as Mapgl, Source, Layer } from 'react-map-gl'
<<<<<<< HEAD
import { GpsSession } from '../services/gpsApi'
=======
import { GpsSession } from '../services/gps-session'
>>>>>>> stuff
import {
  MAP_ACCESS_TOKEN,
  MAP_STYLE,
  defaultInitialViewState,
} from '../constants'

// Function to convert latitude/longitude arrays into GeoJSON
const convertToGeoJSON = (latitude: number, longitude: number) => {
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [latitude, longitude],
        },
        properties: {},
      },
    ],
  } as never
}

type MapProps = {
  session: GpsSession
}

export default function Map(props: MapProps) {
  const { session } = props

  return (
    <Mapgl
      initialViewState={defaultInitialViewState}
      style={{ width: '100%', height: 300 }}
      mapStyle={MAP_STYLE}
      mapboxAccessToken={MAP_ACCESS_TOKEN}
    >
      <Source
        id={`session-${session.id}`}
        type="geojson"
        data={convertToGeoJSON(session.latitude, session.longitude)}
      >
        <Layer
          id={`route-${session.id}`}
          type="line"
          layout={{
            'line-join': 'round',
            'line-cap': 'round',
          }}
          paint={{
            'line-color': '#ff0000',
            'line-width': 4,
          }}
        />
      </Source>
    </Mapgl>
  )
}
