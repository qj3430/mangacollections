import React, { useState } from "react";
import "./NewTitle.css";
const NewTitle = ({ onAddTitle, onClose }) => {
  const [newTitleName, setNewTitleName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [illustratorName, setIllustratorName] = useState("");
  const [coverURL, setCoverURL] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      newTitle: newTitleName,
      authorName: authorName,
      illustratorName: illustratorName,
      coverURL: coverURL,
    };
    onAddTitle(data);
    onClose();
  };

  return (
      <div className="popup-window">
        <div className="popup-content">
          <h2>Add New Title</h2>
          <form onSubmit={handleSubmit}>
            <div className="new_input_field">
              <label>Title Name: </label>
              <input
                type="text"
                id="new_title_name"
                placeholder="Type here..."
                onChange={(e) => setNewTitleName(e.target.value)}
                value={newTitleName}
              />
            </div>
            <div className="new_input_field">
              <label>Author Name: </label>
              <input
                type="text"
                id="new_author_name"
                placeholder="Type here..."
                onChange={(e) => setAuthorName(e.target.value)}
                value={authorName}
              />
            </div>
            <div className="new_input_field">
              <label>Illustrator Name: </label>
              <input
                type="text"
                id="new_illustrator_name"
                placeholder="Type here..."
                onChange={(e) => setIllustratorName(e.target.value)}
                value={illustratorName}
              />
            </div>
            <div className="new_input_field">
              <label>Title Cover URL: </label>
              <input
                type="text"
                id="new_title_cover_URL"
                placeholder="Type here..."
                onChange={(e) => setCoverURL(e.target.value)}
                value={coverURL}
              />
            </div>
            <div className="new_cta_button">
              <button type="button" onClick={onClose}>
                Cancel
              </button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default NewTitle;
