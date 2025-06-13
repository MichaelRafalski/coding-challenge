import React from 'react';
import { GpsPosition } from '../../services/gpsApi';
import { formatTimestamp } from '../../services/gpsApi';
import './PositionsTable.scss';

interface PositionsTableProps {
  positions: GpsPosition[];
}

export const PositionsTable: React.FC<PositionsTableProps> = ({ positions }) => (
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
); 