import './App.css';
import React, { useRef } from 'react'
import Home from "./components/Home.jsx";
import Dates from "./components/Dates.jsx";
import Page from "./Page.jsx";
import { motion, useScroll, useTransform } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from './components/LoginScreen.jsx';
import MainView from './components/backoffice.jsx';
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
    </Routes>
    </BrowserRouter>
  );
}

export default App;
