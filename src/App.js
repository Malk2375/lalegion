import React, { useRef } from 'react';
import Page from './components/Page.jsx';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from './components/LoginScreen.jsx';
import MainView from './components/backoffice.jsx';
import ChampionPage from './components/champion.jsx'; // Importer ChampionPage

function App() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1], [0, 600]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/Backoffice" element={<MainView />} />
        <Route path="/champion/:id" element={<ChampionPage />} /> // Utiliser ChampionPage
      </Routes>
    </BrowserRouter>
  );
}

export default App;
