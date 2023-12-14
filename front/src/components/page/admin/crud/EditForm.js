import React from "react";
import { useForm } from "react-hook-form";

const EditForm = ({ oeuvreId, categories, matieres, onSubmit }) => {
  const { register, handleSubmit, setValue } = useForm();

  // Utilisez setValue pour définir les valeurs par défaut après l'initialisation du formulaire
  React.useEffect(() => {
    setValue("titre", oeuvreId.titre);
    setValue("categories", oeuvreId.categories);
    setValue("matiere", oeuvreId.matieres);
    setValue("description", oeuvreId.description);

    // ... définissez d'autres valeurs avec setValue si nécessaire
  }, [oeuvreId, setValue]);

  console.log("Valeurs par défaut du formulaire :", oeuvreId);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Titre:
        <input {...register("titre")} />
      </label>

    <label>
  Catégories:
  {categories.map((categorie) => (
    <div key={categorie.id}>
      <input
        type="checkbox"
        value={categorie.id}
        {...register("categories")}
        defaultChecked={oeuvreId.categories.includes(categorie.id)}
      />
      <span>{categorie.nom}</span>
    </div>
  ))}
</label>

<label>
  Matières:
  {matieres.map((matiere) => (
    <div key={matiere.id}>
      <input
        type="checkbox"
        value={matiere.id}
        {...register("matiere")}
        defaultChecked={oeuvreId.matieres.includes(matiere.id)}
      />
      <span>{matiere.nom}</span>
    </div>
  ))}
</label>

      <label>
        Description:
        <textarea {...register("description")} />
      </label>

      {/* Ajoutez d'autres champs du formulaire selon vos besoins */}

      <button type="submit">Modifier</button>
    </form>
  );
};

export default EditForm;
