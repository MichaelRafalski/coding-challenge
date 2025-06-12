import React, { useRef } from "react";
import "./Toggle.scss";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="refresh-controls toggle-container">
      {label && (
        <label
          className="toggle-label"
          onClick={() => inputRef.current?.click()}
        >
          {label}
        </label>
      )}
      <label className="switch">
        <input
          ref={inputRef}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};
