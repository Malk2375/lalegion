import React, { useState, useEffect, useRef } from 'react';
import Home from "./components/Home.jsx";
import Dates from "./components/Dates.jsx";
import { motion, useScroll, useTransform } from "framer-motion";
import './App.css';
const Page = () => {
  // const ref = useRef(null);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 1) { // Changer 100 selon votre besoin
  //       window.scrollTo({ top: 737, behavior: 'instant' });
  //     } 
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);
  return (
    <div className="App">
      <Home
      // initial={{ opacity: 0 }}
      // whileInView={{ opacity: 1 }}
      />
      <Dates />
    </div>
  )
}

export default Page