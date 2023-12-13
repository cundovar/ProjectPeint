import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditForm from "./EditForm";
import axios from "axios";
import { URL } from "../../../../service/url";



const Edit =()=>{

    const [oeuvreId, setOeuvreId]=useState({});

    const {id}=useParams()
    /* Appel API pour récupérer les détails par ID */;
    const fetchOeuvreiD = async()=>{
        try{
            const {data}=await axios.get(`${URL.fecthOeuvreId}/${id}`)
            setOeuvreId(data)
            console.log('ok')
            console.log( data);
      }catch(error){
        console.error("Erreur :", error);
      }
    }
    useEffect(()=>{
        fetchOeuvreiD()
    },[])

    const onSubmit = async (data) => {
  //requete api mettre a jour oeuvre
try{
  const modifOeuvre={
    titre: data.titre,
    description:data.description,
    categories:[`${data.categories}`],
    matiere:[`${data.matieres}`],
  }
  console.log('ID de l\'œuvre :', id);
  const response = await axios.put(`http://localhost:8010/api/oeuvres/${id}`, modifOeuvre, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('response',response)
  
  if (response.status === 200) {
    console.log('response',response)
    console.log('L\'œuvre a été mise à jour avec succès :', response.data);
    // Ajouter d'autres logiques ou rediriger l'utilisateur après la mise à jour réussie
  } else {
    console.error('Erreur lors de la mise à jour de l\'œuvre :', response.status, response.data);
  }
} catch (error) {
  console.error('Erreur lors de la requête API :', error);
  // Gérer les erreurs, afficher des messages à l'utilisateur, etc.
}
console.log('Données soumises :', data);


};

    return(
        <div>
        <h2>Modifier l'œuvre{id} </h2>
        <EditForm oeuvreId={oeuvreId} onSubmit={onSubmit} />
      </div>
      )

}

export default Edit