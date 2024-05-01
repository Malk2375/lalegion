import React, { useRef } from 'react'
import Navbar from './Navbar'
import BackImage from '../Assets/fondst.png';
import { motion, useScroll, useTransform, animate } from "framer-motion";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
const Home = () => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };
  return (
<motion.section className="home-container">
      <Navbar />
      <div className="navbar-social-media-icons">
        {/* Instagram */}
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
          <FaInstagram />
        </a>
        {/* YouTube */}
        <a href="https://www.youtube.com/watch?v=LCPyV5F4BS8&list=RDLCPyV5F4BS8&start_radio=1" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
          <FaYoutube />
        </a>
        {/* TikTok */}
        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
          <FaTiktok />
        </a>
      </div>
      <div className='tedy'>
        <button onClick={scrollToBottom} className='explorer'>Explorer</button>
      </div>
      <div className='tedy-banner' >
        <h1 className='tedy-banner-h1'>LÉGENDES</h1>
        <span>Les combats légendaires du judo aux <br /> <span>Jeux Olympiques</span> </span>
      </div>
    </motion.section>
  )
}

export default Home