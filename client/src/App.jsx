import { useState, useEffect } from "react";
import "./App.css";
import CardsList from "./Components/CardsList";

function App() {
  const url = "http://localhost:8888/title";

  const [titles, setTitles] = useState([]);
  // TODO: Add into titles array
  // NOTE: use spread operator to perform append array
  const handleAddTitle = async (newTitle) => {
    try {
      // TODO: insert into database
      // NOTE: console log success the newTitle
      console.log(newTitle);
      //const res = await fetch(url, {
      //  method: "POST",
      //  headers: {"Content-Type": "application/json"},
      //  body: JSON.strigify(newTitle)
      //})
    } catch (err) {
      console.log(err.messages);
    }
  };

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await fetch(url);
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setTitles(data);
      } catch (error) {
        console.error("Error fetching titles:", error);
      }
    };

    fetchTitles();
  }, []);

  // TODO: Allow User to add manga title, series and volume
  return (
    <div className="App">
      <CardsList mangas={titles} onAddTitle={handleAddTitle} />
    </div>
  );
}

export default App;
