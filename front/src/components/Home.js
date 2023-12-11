import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../service/url";
import DeleteButton from "./utils/DeleteButton";

const Home = () => {
  const [oeuvre, setOeuvre] = useState([]);
  const [indexTableau, setIndexTableau] = useState(0);
  const tableau = ["hh", "ff", "aa"];
  const plus = () => {
    setIndexTableau((prevIndex) => (prevIndex + 1) % tableau.length);
  };

  const handleSuccessfulDelete = () => {
    // Code à exécuter après une suppression réussie
    console.log('Suppression réussie !');
  };

  useEffect(() => {
    const fetchOeuvre = async () => {
      try {
        const { data } = await axios.get(URL.fecthAllOeuvre);
        setOeuvre(data["hydra:member"]);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchOeuvre();
  }, []);

  return (
    <>
      <p>test :{tableau[indexTableau]} </p>
      <button onClick={plus}>plus 1</button>

      <div className="mt-10">test 1</div>
      <div className="oeuvre flex flex-wrap space-x-8 space-y-10 mt-10">
        {oeuvre &&
          oeuvre?.map((item, index) => (
            <div key={index} className="border space-y-5 ">
              <div>{item.titre}</div>

              <div> comentaire :{item.commentaire}</div>
              <div> description :{item.description}</div>
              <DeleteButton  apiUrl={`http://localhost:8010/api/oeuvres/${item.id}`}  onSuccessfulDelete={handleSuccessfulDelete} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
