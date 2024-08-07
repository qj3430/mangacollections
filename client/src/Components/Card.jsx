import React from "react";
import "./Card.css";

const Card = ({ title_name, image_url, title_id}) => {
  const handleViewMore = () => {
    // TODO: bring user to title detail page using title_id
  }
  return (
    <div className="card">
      <div
        className="card-image"
        style={{ backgroundImage: `url(${image_url})` }}
      ></div>
      <div className="card-overlay">
        <p>{title_name}</p>
        <button onClick={handleViewMore}>View More</button>
      </div>
    </div>
  );
};


export default Card;
