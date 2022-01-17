import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, Outlet } from 'react-router-dom';
import HotelList from './components/HotelList';
import Home from './components/Home';
import RoomList from './components/RoomList';
import Web3 from 'web3';

ReactDOM.render(
  <React.StrictMode>
    <Router >
      <Routes>
        <Route path="/" element={<App />}/>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
