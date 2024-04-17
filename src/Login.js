import React, { useState } from 'react';
import { useNavigate, } from "react-router-dom";
import axios from 'axios';
import "./Login.css"

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    navigate('/home/'+username);
    try {

      await axios.post('http://127.0.0.1:4343/users/add', { username, email, password });
      navigate('/home/' + username);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='Login-Component'>
      <div className='Login-background'>
        <form className='Login-form'>
          <span className="Logo">Wanderly !</span>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} type="submit" className="Login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

