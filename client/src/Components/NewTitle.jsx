import React, { useState } from "react";
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
    
    <div className="popup-content">
      <h2>Add New Title</h2>
      <form onSubmit={handleSubmit}>
        <label>Title Name: </label>
        <input
          id="new_title_name"
          placeholder="Type here..."
          onChange={(e) => setNewTitleName(e.target.value)}
          value={newTitleName}
        />
        <label>Author Name: </label>
        <input
          id="new_author_name"
          placeholder="Type here..."
          onChange={(e) => setAuthorName(e.target.value)}
          value={authorName}
        />
        <label>Illustrator Name: </label>
        <input
          id="new_illustrator_name"
          placeholder="Type here..."
          onChange={(e) => setIllustratorName(e.target.value)}
          value={illustratorName}
        />
        <label>Title Cover URL: </label>
        <input
          id="new_title_cover_URL"
          placeholder="Type here..."
          onChange={(e) => setCoverURL(e.target.value)}
          value={coverURL}
        />
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewTitle;
