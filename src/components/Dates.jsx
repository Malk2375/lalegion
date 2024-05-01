import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { champions } from "./champions.js";
import Logo from "../Assets/FRANCE_JUDO_LOGOTYPE_RVB_PRINCIPAL-BLEU 2_layerstyle.png";

const Dates = () => {
  const [selectedChampion, setSelectedChampion] = useState(champions[0]);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <motion.section className='Dates-container'>
      <div className="window">
        <main>
          {selectedChampion && (
            <motion.div
              key={selectedChampion.year} // Utiliser l'année comme clé unique
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 1 }}
              className='combat-presentation'
            >
              <div className='year-name-banner'>
                <div className='year-banner'>{selectedChampion.year}</div>
                <h1 className='name-banner'>{selectedChampion.name}</h1>
              </div>
              <div style={{ marginBottom: "45px", width: "200px" }}>
                <img src={Logo} alt="Logo" />
              </div>
              <div className='champion-image'>
                <img
                  src={selectedChampion.icon}
                  alt={selectedChampion.name}
                />
              </div>
              <p className='blur-description'>{selectedChampion.description}</p>
            </motion.div>
          )}
          <div className='dates-banner'>
            <ul>
              {champions.map((champion, index) => (
                <React.Fragment key={index}>
                  {index !== 0 && Array(3).fill().map((_, i) => (
                    <li className="circle-separator" key={i}>•</li>
                  ))}
                  <li
                    className={champion === selectedChampion ? "selected" : ""}
                    onClick={() => setSelectedChampion(champion)}
                  >
                    {champion.year}
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </div>
          <div className='Main-container'>
          <button onClick={scrollToTop} className='Main'>Main</button>
          </div>
        </main>
      </div>
    </motion.section>
  );
}

export default Dates;
