import React, {useState} from "react";
import Card from "./Card";
import "./CardsList.css";
import NewTitle from "./NewTitle"

const CardsList = ({ mangas, onAddTitle }) => {
  const [showForm, setShowForm] = useState(false)
  const handleAddTitle = (newTitle) => {
    onAddTitle(newTitle)
    setShowForm(false)
  }
  
  return (
    // TODO: add new title 
    <div className="mangaListSection">
      <div className="header">
        <h2>My Collections</h2>
        <button onClick={() => setShowForm(true)}>Add New Title</button>
      </div>
      {showForm && (
        <NewTitle 
          onAddTitle={handleAddTitle}
          onClose={() => setShowForm(false)}
        />
      )}
      <div className="cardsList">
        {mangas.map((manga, index) => (
          <Card
            key={manga.title_id}
            imageUrl={manga.title_cover_url}
            titleName={manga.title_name}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsList;
