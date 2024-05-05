import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Assurez-vous d'importer votre configuration Firebase
import './champion.css'
import video2 from '../Assets/1200x680_maxnewsworldfive268817.jpg';
import cadre from '../Assets/Rectangle379.png'
const ChampionPage = () => {
  const { id } = useParams(); // Récupérer l'ID du champion depuis l'URL
  const [champion, setChampion] = useState(null);

  useEffect(() => {
    const fetchChampionData = async () => {
      try {
        const championDoc = await getDoc(doc(db, 'champions', id)); // Récupérer les données du champion depuis la base de données
        if (championDoc.exists()) {
          setChampion({ id: championDoc.id, ...championDoc.data() });
        } else {
          console.log('Champion not found');
        }
      } catch (error) {
        console.error('Error fetching champion data:', error);
      }
    };

    fetchChampionData();
  }, [id]); // Effectue la requête lorsque l'ID du champion change

  if (!champion) {
    return <div>Loading...</div>; // Afficher un indicateur de chargement pendant le chargement des données
  }
  return (
    <div className="champion-page">
      <div className='champion-container'>
        <section className='champions-combat' >
          <div
            className="background-image"
            style={{
              backgroundImage: `url(${champion.url})`,
            }}
          />
          <h1 className='champion-name'>
            {champion.name}
          </h1>
          <div className='combatYear'>{champion.year}</div>
          <span className='petittitre'>Et ces deux victoires consécutives aux Jeux Olympiques !</span>
        </section>
        <section className='section-quiest'>
          <h1 className='QUIEST' >
            QUI-EST CE CHAMPION ?
          </h1>
          <img className='image1' src={champion.url} alt="" />
          <div className='texte1 text'>
            {champion.QUIEST}
          </div>
          <img className='cadre' src={cadre} alt="" />
        </section>
        <section>
          <h1 className="Face">
            la Face caché <br /> de la victoire
          </h1>
          <div className='video'>
            <img className='video-miniature' src={champion.url} alt="" />
          </div>
          <div className='texteLaFace text'>
            {champion.LaFaceCache}
          </div>
        </section>
        <h1 className='QUIEST extrait' style={{textTransform: "uppercase", width:"70rem" }}>
          extraits video
        </h1>
        <div className='video2'>
          <img src={champion.url} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ChampionPage;
