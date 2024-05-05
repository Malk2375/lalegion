import React, { useState, useEffect, useRef } from 'react';
import Home from "./Home.jsx";
import Dates from "./Dates.jsx";
import { motion, useScroll, useTransform, animate } from "framer-motion";
import '../App.css';
const Page = () => {
  const { scrollYProgress } = useScroll();
  return (
    <div className="App">
      <Home/>
      <Dates />
    </div>
  )
}

export default Page