import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import "../firebaseConfig"

export default function MainView() {
  const [champions, setChampions] = useState([]);
  const [championData, setChampionData] = useState({
    name: '',
    year: '',
    weight: '',
    description: '',
    url:'',
    Adversaire:'',
    QUIEST:'',
    LaFaceCache:'',
  });
  const [editingChampionId, setEditingChampionId] = useState(null);
  const auth = getAuth();
  const firestore = getFirestore();

  useEffect(() => {
    const fetchChampions = async () => {
      const championsSnapshot = await getDocs(collection(firestore, "champions"));
      const championsData = championsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChampions(championsData);
    };

    fetchChampions();
  }, [firestore]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChampionData({ ...championData, [name]: value });
  };

  const handleAddChampion = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, "champions"), championData);
      console.log("Champion ajouté avec succès");
      // Réinitialiser les données du champion après l'ajout réussi
      setChampionData({
        name: '',
        year: '',
        weight: '',
        description: '',
        url: '',
        Adversaire: '',
        QUIEST: '',
        LaFaceCache: '',
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du champion :", error);
    }
  };


  const handleEditChampion = (champion) => {
    setEditingChampionId(champion.id);
    setChampionData({
      name: champion.name,
      year: champion.year,
      weight: champion.weight,
      description: champion.description,
      url: champion.url,
      Adversaire: champion.Adversaire,
      QUIEST: champion.QUIEST,
      LaFaceCache: champion.LaFaceCache,
    });
  };

  const handleUpdateChampion = async () => {
    try {
      await updateDoc(doc(firestore, "champions", editingChampionId), {
        name: championData.name,
        year: championData.year,
        weight: championData.weight,
        description: championData.description,
        url: championData.url,
        Adversaire: championData.Adversaire,
        QUIEST: championData.QUIEST,
        LaFaceCache: championData.LaFaceCache,
      });
      console.log("Champion mis à jour avec succès");
      // Mettre à jour le tableau des champions après la mise à jour
      const updatedChampions = champions.map(champion => {
        if (champion.id === editingChampionId) {
          return {
            ...champion,
            name: championData.name,
            year: championData.year,
            weight: championData.weight,
            description: championData.description,
            url: championData.url,
            Adversaire: championData.Adversaire,
            QUIEST: championData.QUIEST,
            LaFaceCache: championData.LaFaceCache,
          };
        }
        return champion;
      });
      setChampions(updatedChampions);
      // Réinitialiser les données du champion après la mise à jour réussie
      setChampionData({
        name: '',
        year: '',
        weight: '',
        description: '',
        url:'',
        Adversaire: '',
        QUIEST: '',
        LaFaceCache: '',
      });
      setEditingChampionId(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du champion :", error);
    }
  };

  const handleDeleteChampion = async (id) => {
    try {
      await deleteDoc(doc(firestore, "champions", id));
      console.log("Champion supprimé avec succès");
      // Mettre à jour la liste des champions après la suppression
      setChampions(champions.filter(champion => champion.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du champion :", error);
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Déconnexion réussie");
        // Naviguer vers la pweight de connexion après la déconnexion
      })
      .catch((error) => {
        console.error("Erreur lors de la déconnexion :", error);
      });
  };

  return (
    <div className='Wraping'>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "64rem", marginBottom: "30px" }}>
          <h1>La legion Administration</h1>
          <button className='btn btn-danger' style={{ margin: "20px" }} title='Déconnexion' onClick={handleSignOut}>Déconnexion</button>
        </div>
      <form style={{width:"50vw" , display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center" }} onSubmit={editingChampionId ? handleUpdateChampion : handleAddChampion}>
          <input style={{ marginBottom: "20px" }} type="text" className='form-control' name="name" value={championData.name} onChange={handleInputChange} placeholder="name du champion" required />
          <input style={{ marginBottom: "20px" }} type="text" className='form-control' name="year" value={championData.year} onChange={handleInputChange} placeholder="year du champion" required />
          <input style={{ marginBottom: "20px" }} type="number" className='form-control' name="weight" value={championData.weight} onChange={handleInputChange} placeholder="weight du champion" required />
          <textarea style={{ marginBottom: "20px" }} name="description" className='form-control' value={championData.description} onChange={handleInputChange} placeholder="Description du champion" required />
        <input style={{marginBottom:"20px"}} type="url" name="url" className='form-control' value={championData.url} onChange={handleInputChange} placeholder="URL de l'icon du champion" />
          <textarea style={{ marginBottom: "20px" }} name="Adversaire" className='form-control' value={championData.Adversaire} onChange={handleInputChange} placeholder="Adversaire du champion" />
          <textarea style={{ marginBottom: "20px" }} name="QUIEST" className='form-control' value={championData.QUIEST} onChange={handleInputChange} placeholder="QUIEST ce champion" />
          <textarea style={{ marginBottom: "20px" }} name="LaFaceCache" className='form-control' value={championData.LaFaceCache} onChange={handleInputChange} placeholder="La Face Caché du combat" />
        <button className='btn btn-info' type="submit">{editingChampionId ? "Mettre à jour Champion" : "Ajouter Champion"}</button>
      </form>
      </div>
      <table style={{fontSize:"0.8rem"}} class='table table-hover mt-4'>
        <thead>
          <tr class="table-primary">
            <th scope="col">name</th>
            <th scope="col">year</th>
            <th scope="col">weight</th>
            <th scope="col">Description</th>
            <th scope="col">Url Icon</th>
            <th scope="col">Admin</th>
          </tr>
        </thead>
        <tbody>
          {champions.map((champion) => (
            <tr key={champion.id}>
              <td >{champion.name}</td>
              <td>{champion.year}</td>
              <td>{champion.weight}</td>
              <td>{champion.description}</td>
              <td >{champion.url}</td>
              <td>
                <button className='btn btn-danger' style={{marginBottom:"20px"}}  onClick={() => handleDeleteChampion(champion.id)}>Supprimer</button>
                <button className='btn btn-warning' onClick={() => handleEditChampion(champion)}>Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}