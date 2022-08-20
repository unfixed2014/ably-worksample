import React from 'react';
import logo from './logo.svg';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import About from './pages/About';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Link to="/home">Home</Link>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
