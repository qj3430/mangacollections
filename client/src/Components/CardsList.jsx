import React from "react";
import Card from "./Card";
import "./CardsList.css";

const CardsList = ({ mangas }) => {
  return (
    <div className="mangaListSection">
      <div className="header">
        <h2>My Collections</h2>
        <button>Add New Title</button>
      </div>
      <div className="cardsList">
        {mangas.map((manga, index) => (
          <Card
            key={index}
            imageUrl={manga.imageUrl}
            titleName={manga.titleName}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsList;
