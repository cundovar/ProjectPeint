import React from 'react';
import { useForm } from 'react-hook-form';

const EditForm = ({ oeuvre, onSubmit }) => {
  const { register, handleSubmit } = useForm({ defaultValues: oeuvre });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Titre:
        <input {...register('titre')} />
      </label>

      <label>
        Description:
        <textarea {...register('description')} />
      </label>

      {/* Ajoutez d'autres champs du formulaire selon vos besoins */}

      <button type="submit">Modifier</button>
    </form>
  );
};

export default EditForm;
