import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Assurez-vous d'importer votre configuration Firebase
import './champion.css'

import video2 from './Assets/1200x680_maxnewsworldfive268817.jpg';

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
        <div className='champions-combat' style={{color:"black"}}>
          {/* <img src={video2} alt="" /> */}
          <div style={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
            <div>
            <h1 className='champion-name' style={{ marginTop:"20px",  paddingTop: "130px", paddingLeft: "50px" }}>
                {champion.name}
            </h1>
            <span className='vs' style={{ marginLeft: "10rem", fontSize:"25px" }}>VS</span>
            <h1 className='champion-name' style={{ marginLeft: "10rem" }}>
              {champion.Adversaire}
            </h1>
          </div>
            <div className='combatYear'>{champion.year}</div>
          </div>
        </div>
        <h1 className='QUIEST' >
          QUI-EST CE CHAMPION ?
        </h1>
        <img className='image1' src={video2} alt="" />
        <div className='texte1'>
          {champion.QUIEST}
        </div>
        <h1 className="QUIEST" style={{width:"72rem"}}>
          la Face caché <br /> de la victoire
        </h1>
        <div className='video'>
          <img src={video2} alt="" />
        </div>
        <div className='texteLaFace'>
          {champion.LaFaceCache}
        </div>
        <h1 className='QUIEST' style={{textTransform: "uppercase", width:"75rem" }}>
          extrait video
        </h1>
        <div className='video2'>
          <img src={video2} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ChampionPage;