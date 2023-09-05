import { Link } from "react-router-dom";

import "./Card.css";

export default function Card(props) {
  return (
    <div className="Card">
      <img src={props.image} alt="" className="cardImg" />

      <h2 className="nombre">{props.name.toUpperCase()}</h2>
      <article className="info-container">
        <h2 className="diet-title">DIETS</h2>
        <div className="diets-container">
          {props.diets.map((diet, index) => (
            <h3 key={index} className="diet-names">
              {diet.charAt(0).toUpperCase() + diet.slice(1)}
            </h3>
          ))}
        </div>
        <Link className="img-container" to={`/details/${props.id}`}>
          <button>RECIPE DETAIL</button>
        </Link>
      </article>
    </div>
  );
}
