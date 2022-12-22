import { React, useEffect, useState } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import History from './pages/History';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [content, setContent] = useState(<Home />);

  return (
    <BrowserRouter>
      <Navbar
        username={username}
        setContent={setContent}
        setUser={setUsername}
      />
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home username = {username}/>} />
          <Route path="/About" element={<About/>} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/History" element={<History username = {username} />} />
          <Route path="/Login" element={<Login/>} />
        </Routes>
      </BrowserRouter> */}
      {content}
    </BrowserRouter>
  );
}

export default App;
