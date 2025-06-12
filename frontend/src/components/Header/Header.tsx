import React, { ReactNode } from "react";
import "./Header.scss";

interface HeaderProps {
  left?: ReactNode;
  middle?: ReactNode;
  right?: ReactNode;
}

export const Header = ({ left, middle, right }: HeaderProps) => {
  return (
    <header className="app-header">
      <div className="header-content">
        {left && <div className="header-left">{left}</div>}
        {middle && <div className="header-center">{middle}</div>}
        {right && <div className="header-right">{right}</div>}
      </div>
    </header>
  );
};
