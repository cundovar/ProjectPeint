import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../service/url";

const Home = () => {
  const [oeuvre, setOeuvre] = useState([]);
  const [indexTableau,setIndexTableau]=useState(0)
  const tableau=['hh','ff','aa']
  const plus=()=>{
    setIndexTableau((prevIndex)=>(prevIndex+1)% tableau.length)
  }


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
              <button onClick= {plus}>plus 1</button>
             

      <div className="mt-10">test 1</div>
      <div className="oeuvre flex space-x-3 mt-10">
      {oeuvre &&
        oeuvre.map((item, index) => (
          <div key={index}>
            <div>{item.titre}</div>
            <div>{item.image}</div>
            <div>{item.commentaire}</div>
            <div>{item.description}</div>
          </div>
        ))}

      </div>
    </>
  );
};

export default Home;
