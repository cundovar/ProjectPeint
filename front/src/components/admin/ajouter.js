import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../service/url";


const Ajouter = () => {


  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    image: "",
    matieres: [], // Champ pour les matières (liste vide au départ)
    categories: [], // Champ pour les catégories (liste vide au départ)
  });

  const [matieres, setMatieres] = useState([]);
  const [categories, setCategories] = useState([]);
 

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

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      // Formatage des champs "matieres" et "categories" pour correspondre au format JSON attendu
      const formattedData = {
        ...formData,
        matieres: formData.matieres.map((matiere) => matiere["@id"]),
        categories: formData.categories.map((categorie) => categorie["@id"]),
      };

    

      const response = await axios.post(
        "http://localhost:8010/api/oeuvres",
        formattedData, // Utilisation des données formatées
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        console.log("ok");
      } else {
        console.log("raté");
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

  // Fonction de gestion de la sélection des matières
  const handleMatieresChange = (selectedMatieres) => {
    setFormData({ ...formData, matieres: selectedMatieres });
  };

  // Fonction de gestion de la sélection des catégories
  const handleCategoriesChange = (selectedCategories) => {
    setFormData({ ...formData, categories: selectedCategories });
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
        />
    



        {/* Sélecteur pour les matières */}
        <select
  // multiple // Permet de sélectionner plusieurs matières
  name="matieres"
  value={formData.matieres} // Assurez-vous que formData.matieres est un tableau
  onChange={(e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => JSON.parse(option.value));
    handleMatieresChange(selectedOptions);
  }}
>
  <option value="">Sélectionnez une ou plusieurs matières</option>
  {matieres.map((matiere) => (
    <option key={matiere.id} value={JSON.stringify(matiere)}>
      {matiere.nom}
    </option>
  ))}
</select>
        {/* Sélecteur pour les catégories */}
        <select
    
          name="categories"
          value={formData.categories}
          onChange={(e) => {
            const selectedOptions = Array.from(
              e.target.selectedOptions,
              (option) => JSON.parse(option.value)
            );
            handleCategoriesChange(selectedOptions);
          }}
        >
          <option value="">Sélectionnez une ou plusieurs catégories</option>
          {categories.map((categorie) => (
            <option key={categorie.id} value={JSON.stringify(categorie)}>
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
