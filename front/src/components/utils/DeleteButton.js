import React, { useState } from 'react';
import axios from 'axios';

const DeleteButton = ({ apiUrl, onSuccessfulDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      // Effectuer la requête DELETE vers l'API
      const response = await axios.delete(apiUrl);
      
      // Si la suppression est réussie, appeler la fonction onSuccessfulDelete
      if (response.status === 204) {
        onSuccessfulDelete();
      } else {
        console.error('Erreur lors de la suppression :', response.status, response.data);
      }
    } catch (error) {
      console.error('Erreur lors de la requête DELETE :', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? 'Suppression en cours...' : 'Supprimer'}
    </button>
  );
};

export default DeleteButton;
