import React from "react";
import "./Card.css";

const Card = ({ titleName, imageUrl }) => {
  return (
    <div className="card">
      <div
        className="card-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="card-overlay">
        <p>{titleName}</p>
        <button>View More</button>
      </div>
    </div>
  );
};
// TODO: View more layout
// TODO: Series 
export default Card;
