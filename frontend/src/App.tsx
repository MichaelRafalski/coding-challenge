import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MapGridPage } from "./pages/MapGridPage/MapGridPage";
import { SessionDetailsPage } from "./pages/SessionDetailsPage";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <main>
          <Routes>
            <Route path="/" element={<MapGridPage />} />
            <Route
              path="/session/:sessionId"
              element={<SessionDetailsPage />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
