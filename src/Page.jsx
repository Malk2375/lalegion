import React, { useState, useEffect, useRef } from 'react';
import Home from "./components/Home.jsx";
import Dates from "./components/Dates.jsx";
import { motion, useScroll, useTransform } from "framer-motion";
import './App.css';
const Page = () => {
  return (
    <div className="App">
      <Home/>
      <Dates />
    </div>
  )
}

export default Page