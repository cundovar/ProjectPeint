


import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../service/url";

const Ajouter = () => {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    image: "",
    matieres: "",
    categories: "",
  });

  const [matieres, setMatieres]=useState([])
  const [categories,setCategories]=useState([])

  useEffect(() => {
    // Récupérer les données des matières depuis l'API
    axios.get(URL.fecthAllMatieres).then((response) => {
      setMatieres(response.data["hydra:member"]);
    });

    // Récupérer les données des catégories depuis l'API
    axios.get(URL.fecthAllCaregories).then((response) => {
      setCategories(response.data["hydra:member"]);
    });
  }, []);
  // Le tableau vide signifie que cette opération s'exécute une seule fois après le rendu initial


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8010/api/oeuvres",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        console.log("ok");
      }else{
        console.log('raté')
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
    <div className="ff">
      <h1>Ajouter une oeuvre</h1>
      <form onSubmit={handleSubmit} className="ff">
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
       <select
          name="matieres"
          value={formData.matieres}
          onChange={handleChange}
        >
          <option value="">Sélectionnez une matière</option>
          {matieres.map((matiere) => (
            <option key={matiere.id} value={matiere["@id"]}>
              {matiere.nom}
            </option>
          ))}
        </select>
        {/* Liste déroulante pour les catégories */}
        <select
          name="categories"
          value={formData.categories}
          onChange={handleChange}
        >
          <option value="">Sélectionnez une catégorie</option>
          {categories.map((categorie) => (
            <option key={categorie.id} value={categorie["@id"]}>
              {categorie.nom}
            </option>
          ))}
        </select>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default Ajouter;
