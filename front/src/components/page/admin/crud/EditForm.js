import React from 'react';
import { useForm } from 'react-hook-form';

const EditForm = ({ oeuvreId, onSubmit }) => {
  const { register, handleSubmit,setValue} = useForm();


  // Utilisez setValue pour définir les valeurs par défaut après l'initialisation du formulaire
  React.useEffect(() => {
    setValue('titre', oeuvreId.titre);
    setValue('categories', oeuvreId.categories);
    setValue('matiere', oeuvreId.matieres);
    setValue('description', oeuvreId.description);
    // ... définissez d'autres valeurs avec setValue si nécessaire
  }, [oeuvreId, setValue]);



  console.log('Valeurs par défaut du formulaire :', oeuvreId);

  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Titre:
        <input {...register('titre')}/>
      </label>
      <label>
        categories:
        <input {...register('categories')}/>
      </label>
      <label>
        matières:
        <input {...register('matiere')}/>
      </label>

      <label>
        Description:
        <textarea {...register('description')}/>
      </label>

      {/* Ajoutez d'autres champs du formulaire selon vos besoins */}

      <button type="submit">Modifier</button>
    </form>
  );
};

export default EditForm;
