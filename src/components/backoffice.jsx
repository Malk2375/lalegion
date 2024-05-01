import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import "../firebaseConfig"

export default function MainView() {
  const [champions, setChampions] = useState([]);
  const [championData, setChampionData] = useState({
    nom: '',
    prenom: '',
    age: '',
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
        nom: '',
        prenom: '',
        age: '',
        description: ''
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du champion :", error);
    }
  };

  const handleEditChampion = (champion) => {
    setEditingChampionId(champion.id);
    setChampionData({
      nom: champion.nom,
      prenom: champion.prenom,
      age: champion.age,
      description: champion.description
    });
  };

  const handleUpdateChampion = async () => {
    try {
      await updateDoc(doc(firestore, "champions", editingChampionId), {
        nom: championData.nom,
        prenom: championData.prenom,
        age: championData.age,
        description: championData.description
      });
      console.log("Champion mis à jour avec succès");
      // Mettre à jour le tableau des champions après la mise à jour
      const updatedChampions = champions.map(champion => {
        if (champion.id === editingChampionId) {
          return {
            ...champion,
            nom: championData.nom,
            prenom: championData.prenom,
            age: championData.age,
            description: championData.description
          };
        }
        return champion;
      });
      setChampions(updatedChampions);
      // Réinitialiser les données du champion après la mise à jour réussie
      setChampionData({
        nom: '',
        prenom: '',
        age: '',
        description: ''
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
        // Naviguer vers la page de connexion après la déconnexion
      })
      .catch((error) => {
        console.error("Erreur lors de la déconnexion :", error);
      });
  };

  return (
    <>
      <div>AdminView</div>
      <form onSubmit={editingChampionId ? handleUpdateChampion : handleAddChampion}>
        <input type="text" name="nom" value={championData.nom} onChange={handleInputChange} placeholder="Nom du champion" required />
        <input type="text" name="prenom" value={championData.prenom} onChange={handleInputChange} placeholder="Prénom du champion" required />
        <input type="number" name="age" value={championData.age} onChange={handleInputChange} placeholder="Âge du champion" required />
        <textarea name="description" value={championData.description} onChange={handleInputChange} placeholder="Description du champion" required />
        <input type="url" name="url" value={championData.url} onChange={handleInputChange} placeholder="URL de l'image du champion" />
        <button type="submit">{editingChampionId ? "Mettre à jour Champion" : "Ajouter Champion"}</button>
      </form>
      <button title='Déconnexion' onClick={handleSignOut}>Déconnexion</button>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Âge</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {champions.map((champion) => (
            <tr key={champion.id}>
              <td>{champion.nom}</td>
              <td>{champion.prenom}</td>
              <td>{champion.age}</td>
              <td>{champion.description}</td>
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