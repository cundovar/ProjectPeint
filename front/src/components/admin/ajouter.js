import React, { useState } from "react";
import axios from "axios";

const Ajouter = () => {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    image: "",
    matieres: "",
    categories: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8010/api/oeuvres/ajouter",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        console.log("ok");
      }
    } catch (error) {
      console.error("erreur :", error);
      console.error("Message :", error.message);
      console.error("Réponse :", error.response);
      console.error("Configuration :", error.config);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h1>Ajouter une oeuvre</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titre"
          placeholder="Titre"
          value={formData.titre}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <input
          type="text"
          name="image"
          placeholder="URL de l'image"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          type="text"
          name="categories"
          placeholder="Catégories (séparées par des virgules)"
          value={formData.categories}
          onChange={handleChange}
        />
        <input
          type="text"
          name="matieres"
          placeholder="Matières (séparées par des virgules)"
          value={formData.matieres}
          onChange={handleChange}
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default Ajouter;
