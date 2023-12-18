import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { URL } from "../../../../service/url";



const Show =()=>{

    const [oeuvreId, setOeuvreId] = useState({});
    const [categoriesName, setCategoriesName] = useState([]);
    const [matiereName, setMatiereName] = useState([]);
    
    const { id } = useParams();

  
  const fetchOeuvreIdShow = async () => {
    try {
      const { data } = await axios.get(`${URL.fecthOeuvreId}/${id}`);
      setOeuvreId(data);
 

 
      

      console.log("Données récupérées avec succès :", data);
    } catch (error) {
      console.log("Erreur lors de la récupération des détails de l'oeuvre :", error);
    }
  };

  useEffect(() => {
    fetchOeuvreIdShow();
  }, [id]);
    
    console.log("eu",oeuvreId)

    return(
        <>
       <div className="oeuvre flex flex-wrap space-x-8 space-y-10 mt-10">
       
            <div className="border space-y-5 ">
              <div>titre {oeuvreId.titre} </div>
              <div>id : {id}</div>

              <div> comentaire </div>
              <div> description :{oeuvreId.description} </div>
              <div> matiere :{oeuvreId.matieres} </div> 
              <div> catégories :{oeuvreId.categories} </div>
              
              <Link >
                <button>modif</button>
              </Link>
             
            </div>

      </div>
        </>
    )
}


export default Show