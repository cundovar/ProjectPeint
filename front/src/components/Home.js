import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../service/url";
import DeleteButton from "./utils/DeleteButton";
import { Link } from 'react-router-dom';

const Home = () => {
  
  const [oeuvre, setOeuvre] = useState([]);
  // const [indexTableau, setIndexTableau] = useState(0);
  // const tableau = ["hh", "ff", "aa"];
  // const plus = () => {
  //   setIndexTableau((prevIndex) => (prevIndex + 1) % tableau.length);
  // };

 
  const fetchOeuvre = async () => {
    try {
      const { data } = await axios.get(URL.fecthAllOeuvre);
      setOeuvre(data["hydra:member"]);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  useEffect(() => {

    fetchOeuvre();
  },[] ); // le tableau vide appelle une seule fois fetchoeuvre sinon sans se tableau la fonction sera appeller a interval régulier

  const handleSuccessfulDelete = () => {

    // Code à exécuter après une suppression réussie
    fetchOeuvre()
    console.log('Suppression réussie !');
  };

  return (
    <>
      {/* <p>test :{tableau[indexTableau]} </p>
      <button onClick={plus}>plus 1</button>

      <div className="mt-10">test 1</div>
    */}

    <div>
      <Link to='/ajout'>
        <button>ajouter</button>
      </Link>
    </div>
    <div className="oeuvre flex flex-wrap space-x-8 space-y-10 mt-10">
        {oeuvre &&
          oeuvre?.map((item, index) => (
            <div key={index} className="border space-y-5 ">
              <div>{item.titre}</div>
              <div>{item.image}</div>
             
              <div> <img src={item.image} alt={item.titre}/> </div>

              <div> comentaire :{item.commentaire}</div>
              <div> description :{item.description}</div>
              <div> categorie :{item.categories}</div>
              <div> matières :{item.matieres}</div>
              <DeleteButton  apiUrl={`http://localhost:8010/api/oeuvres/${item.id}`}  onSuccessfulDelete={handleSuccessfulDelete } />
              <Link to={`/modif/${item.id}`} >
                <button>modif</button>
              </Link>
              <Link to={`/oeuvre/${item.id}`} >
                <button>voir</button>
              </Link>
            </div>
          ))}
      </div>





    </>
  );
};

export default Home;
