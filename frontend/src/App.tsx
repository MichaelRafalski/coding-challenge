import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import WelcomeScreen from './screen/Welcome'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
      </Routes>
    </Router>
  )
}

export default App
