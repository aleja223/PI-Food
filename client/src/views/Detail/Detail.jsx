import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Detail.css";

export default function Details() {
  var { id } = useParams();

  const [recipe, setRecipe] = useState({});
  const [isValidID, setIsValidID] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/${id}`);
        const data = response.data;

        if (Object.keys(data).length > 0) {
          setRecipe(data);
          setIsValidID(true);
        } else {
          setIsValidID(false);
        }
      } catch (error) {
        setIsValidID(false);
        console.error("Error al obtener la receta:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  return (
    <div className="Details">
      <div>
        <h1>{recipe.name}</h1>
      </div>

      <div className="container">
        <div className="infoContainer">
          <div className="imageContainer">
            <img src={recipe.image} alt={recipe.name} />
          </div>

          <div className="healthScore">
            <h2 className="propiedad" id="scoreTitle">
              HealthScore
            </h2>
            <h2 className="number">{recipe.healthScore}</h2>
          </div>

          <article>
            <h2 className="propiedad">Steps</h2>
            <div className="step-container">
              {recipe.steps?.map((step, index) => {
                return (
                  <h3 key={index} className="step">
                    {step}
                  </h3>
                );
              })}
            </div>
          </article>
        </div>
        <div className="summary-container">
          <article>
            <h2 className="propiedad">Summary</h2>
            <h2 className="selfprop">{recipe.summary}</h2>
          </article>
        </div>
      </div>
    </div>
  );
}
