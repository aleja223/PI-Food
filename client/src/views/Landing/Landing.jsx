import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="background">
      <div className="landing">
        <div className="text">
          <h1 className="title">BIENVENIDOS A MI PI-FOOD</h1>
          <h2 className="subtitle">Diseñado y Creado por:</h2>
          <span className="link">Alejandra León</span>
        </div>
        <div className="buttonContainer">
          <Link to="/home">
            <button id="ingresar">HOME</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
