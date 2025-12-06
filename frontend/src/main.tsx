import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import SearchUser from './pages/SearchUser';
import UserJourney from './pages/UserJourney';
import Analytics from './pages/Analytics';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<SearchUser />} />
          <Route path="user/:userId" element={<UserJourney />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
