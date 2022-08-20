import React, { useState } from 'react';
import logo from './logo.svg';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import About from './pages/About';
import Home from './pages/Home';
import ErrorPage404 from './pages/ErrorPage404';
import Login from './pages/Login';
import PasswordReset from './pages/Password-reset';

function App() {
  const loggedIn = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Link to="/home">Home</Link>
        <Routes>
          <Route path="/" element={loggedIn ? <Navigate replace to="/login" /> : <Home />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="*" element={<ErrorPage404 />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
