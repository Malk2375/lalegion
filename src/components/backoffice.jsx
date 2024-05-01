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
    description: ''
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
        icon: ''
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
      icon: champion.icon
    });
  };

  const handleUpdateChampion = async () => {
    try {
      await updateDoc(doc(firestore, "champions", editingChampionId), {
        name: championData.name,
        year: championData.year,
        weight: championData.weight,
        description: championData.description,
        icon: championData.icon
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
            icon: championData.icon
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
        icon:''
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
    <>
      <div>AdminView</div>
      <form onSubmit={editingChampionId ? handleUpdateChampion : handleAddChampion}>
        <input type="text" name="name" value={championData.name} onChange={handleInputChange} placeholder="name du champion" required />
        <input type="text" name="year" value={championData.year} onChange={handleInputChange} placeholder="year du champion" required />
        <input type="number" name="weight" value={championData.weight} onChange={handleInputChange} placeholder="weight du champion" required />
        <textarea name="description" value={championData.description} onChange={handleInputChange} placeholder="Description du champion" required />
        <input type="url" name="url" value={championData.icon} onChange={handleInputChange} placeholder="URL de l'icon du champion" />
        <button type="submit">{editingChampionId ? "Mettre à jour Champion" : "Ajouter Champion"}</button>
      </form>
      <button title='Déconnexion' onClick={handleSignOut}>Déconnexion</button>

      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>year</th>
            <th>weight</th>
            <th>Description</th>
            <th>Icon</th>
          </tr>
        </thead>
        <tbody>
          {champions.map((champion) => (
            <tr key={champion.id}>
              <td>{champion.name}</td>
              <td>{champion.year}</td>
              <td>{champion.weight}</td>
              <td>{champion.description}</td>
              <td style={{width:"100px"}}>{champion.icon}</td>
              <td>
                <button onClick={() => handleDeleteChampion(champion.id)}>Supprimer</button>
                <button onClick={() => handleEditChampion(champion)}>Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}