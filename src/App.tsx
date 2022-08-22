import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import About from './pages/About';
import Home from './pages/Home';
import ErrorPage404 from './pages/ErrorPage404';
import Login from './pages/Login';
import PasswordReset from './pages/PasswordReset';
import MemberInfo from './pages/MemberInfo';
import VerifyCode from './pages/VerifyCode';
import ModifyPassword from './pages/ModifyPassword';

function App() {
  const loggedIn = useState(false);
  return (
    <div className="App" data-testid="app-wrapper">
      <header className="App-header">
        {/* <Link to="/home" className="text-3xl font-bold underline">
          Home
        </Link> */}
      </header>
      <Routes>
        <Route path="/" element={loggedIn ? <Navigate replace to="/login" /> : <Home />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/member-info" element={<MemberInfo />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/modify-password" element={<ModifyPassword />} />
        <Route path="*" element={<ErrorPage404 />} />
      </Routes>
    </div>
  );
}

export default App;
