import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../service/url";

const Home = () => {
  const [oeuvre, setOeuvre] = useState([]);

  useEffect(() => {
    const fetchOeuvre = async () => {
      try {
        const { data } = await axios.get("http://localhost:8010/api/oeuvres");
        setOeuvre(data["hydra:member"]);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchOeuvre();
  }, []);

  return (
    <>
      <div>test 1</div>
      {oeuvre &&
        oeuvre.map((item, index) => (
          <div key={index}>
            <div>{item.titre}</div>
            <div>{item.image}</div>
            <div>{item.commentaire}</div>
            <div>{item.description}</div>
          </div>
        ))}
    </>
  );
};

export default Home;
