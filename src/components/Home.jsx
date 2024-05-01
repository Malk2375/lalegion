import React, { useRef } from 'react'
import Navbar from './Navbar'
import BackImage from '../Assets/fondst.png';
import { motion, useScroll, useTransform, animate } from "framer-motion";

const Home = () => {
  // const ref = useRef(null);
  // const { scrollY } = useScroll();
  // const y = useTransform(scrollY, [0, 1], [0, 100]);
  return (

//     ref = { ref } style = {{ y }
// }
// className = 'home-container'
// initial = {{ opacity: 0 }}
// whileInView = {{ opacity: 1 }}
    <motion.section className="home-container">
      <Navbar />
      <div className='tedy'></div>
      <div className='tedy-banner' >
        <h1 className='tedy-banner-h1'>LÉGENDES</h1>
        <span>Les combats légendaires du judo aux <br /> <span>Jeux Olympiques</span> </span>
      </div>
    </motion.section>
  )
}

export default Home