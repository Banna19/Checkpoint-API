// src/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  // État pour stocker la liste des utilisateurs
  const [listOfUsers, setListOfUsers] = useState([]);
  // État pour gérer le chargement et les erreurs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utiliser useEffect pour récupérer les données lorsque le composant est monté
  useEffect(() => {
    // Fonction pour obtenir les données
    const fetchUsers = async () => {
      try {
        // Appel API pour obtenir la liste des utilisateurs
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        // Mettre à jour l'état avec les données obtenues
        setListOfUsers(response.data);
      } catch (err) {
        // Gérer les erreurs
        setError(err.message);
      } finally {
        // Indiquer que le chargement est terminé
        setLoading(false);
      }
    };

    // Appeler la fonction pour obtenir les utilisateurs
    fetchUsers();
  }, []); // Le tableau vide signifie que useEffect ne s'exécute qu'une seule fois, lors du montage

  // Afficher le contenu en fonction des états
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {listOfUsers.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;