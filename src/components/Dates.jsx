import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 
import Logo from '../Assets/FRANCE_JUDO_LOGOTYPE_RVB_PRINCIPAL-BLEU 2_layerstyle.png';
import { Link } from 'react-router-dom'; 


const Dates = () => {
  const [selectedChampion, setSelectedChampion] = useState(null);
  const [champions, setChampions] = useState([]); // État pour stocker les champions récupérés

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const championsSnapshot = await getDocs(collection(db, 'champions'));
        let championsData = championsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        championsData = championsData.sort((a, b) => a.year - b.year); 
        setChampions(championsData); 
        setSelectedChampion(championsData[0]);
      } catch (error) {
        console.error('Error fetching champions:', error);
      }
    };

    fetchChampions();
  }, []); // Utilisez un tableau vide comme dépendance pour n'exécuter l'effet qu'une seule fois

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
          <div className='Main-container'>
            <button onClick={scrollToTop} className='Main'>Retourner</button>
          </div>
          {selectedChampion && (
            <motion.div
              key={selectedChampion.year}
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
              <div style={{ marginBottom: '45px', width: '200px' }}>
                <img src={Logo} alt='Logo' />
              </div> 
              <div className='champion-image'>
                <Link to={`/champion/${selectedChampion.id}`}>
                  <img src={selectedChampion.url} alt={selectedChampion.name} />
                  <p style={{ fontFamily:"Bebas Neue", fontSize:"25px"}} className="champion-info">Voir le Champion</p>
                </Link>
              </div>
              <p className='blur-description'>{selectedChampion.description}</p>
            </motion.div>
          )}
          {/* Affichage de la liste des champions */}
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
        </main>
      </div>
    </motion.section>
  );
}

export default Dates;
