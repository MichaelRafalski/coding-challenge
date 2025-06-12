import React from "react";
import "./PointDetailModal.scss";
import vehicle from "./vehicle.png";

interface PointDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    latitude: number;
    longitude: number;
    timestamp: string;
    imageUrl?: string; 
  } | null;
}

export const PointDetailModal: React.FC<PointDetailModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen || !data) {
    return null; 
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          <div className="modal-image-container">
            <img src={vehicle} alt="Point Location" className="modal-image" />
          </div>
          <div className="modal-data-container">
            <h4>Point Details</h4>
            <p>
              <strong>Time:</strong> {data.timestamp}
            </p>
            <p>
              <strong>Latitude:</strong> {data.latitude.toFixed(6)}
            </p>
            <p>
              <strong>Longitude:</strong> {data.longitude.toFixed(6)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
