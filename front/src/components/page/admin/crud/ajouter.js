import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../../../service/url";
import FileUploadSingle from "../../../admin/FileUpload";


const Ajouter = () => {


  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    image: null, // Champ pour le fichier/image (null au départ)
    matieres: [], // Champ pour les matières (liste vide au départ)
    categories: [], // Champ pour les catégories (liste vide au départ)
  });

  const [matieres, setMatieres] = useState([]);
  const [categories, setCategories] = useState([]);
 

  useEffect(() => {
    // Récupérer les données des matières et des catégories depuis l'API simultanément
    Promise.all([axios.get(URL.fecthAllMatieres), axios.get(URL.fecthAllCategories)])
      .then(([matieresResponse, categoriesResponse]) => {
        setMatieres(matieresResponse.data["hydra:member"]);
        setCategories(categoriesResponse.data["hydra:member"]);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Formatage des champs "matieres" et "categories" pour correspondre au format JSON attendu
      const formattedData = {
        ...formData,
        matieres: formData.matieres.map(id =>  `/api/matieres/${id}` ),
        categories: formData.categories.map(id =>  `/api/categories/${id}` ),
        titre:formData.titre,
        description:formData.description,
         // Ajout du champ "image"
         image: formData.image ? formData.image.name : null,
      };
      console.log("formattedData",formattedData)
  
      // Envoyer les données à l'API (utiliser une requête Axios)
      const response = await axios.post('http://localhost:8010/api/oeuvres', formattedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        console.log('Opération réussie :', response.data);
      } else {
        console.error('Erreur lors de l\'opération :', response.status, response.data);
      }
    } catch (error) {
      console.error('Erreur lors de la requête API :', error);
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
  name="matieres"
  value={formData.matieres}
  onChange={(e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option =>  option.value);
    handleMatieresChange(selectedOptions);
  }}
>
  {formData.matieres.length === 0 && (
    <option value="" disabled>Choisissez une ou plusieurs matières</option>
  )}
  {matieres.map((matiere) => (
    <option key={matiere.id} value={matiere.id}>
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
              e.target.selectedOptions,option => option.value);
              
            handleCategoriesChange(selectedOptions);
          }}
        >
            {formData.categories.length === 0 && (
    <option value="" disabled>Choisissez une ou plusieurs categorie</option>
  )}
  {categories.map((categorie) => (
    <option key={categorie.id} value={categorie.id}>
      {categorie.nom}
    </option>
  ))}
        </select>

  {/* Intégration du composant FileUploadSingle */}
  <FileUploadSingle
          onFileChange={(selectedFile, imageUrl) => {
            // Gérez les changements de fichier ici si nécessaire
            console.log('Selected File:', selectedFile);
            console.log('Image URL:', imageUrl);
            setFormData({ ...formData, image: selectedFile });
          }}
          onUploadClick={(file) => {
            // Gérez le clic sur le bouton "Upload" ici si nécessaire
            console.log('Upload Clicked:', file);
          }}
        />



        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default Ajouter;
