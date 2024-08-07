import { useState, useEffect } from "react";
import "./App.css";
import CardsList from "./Components/CardsList";

function App() {
  const url = "http://localhost:8888/title";
  const [titles, setTitles] = useState([]);
  const handleAddTitle = async (newTitle) => {
    try {

      // Database Query
      const titleData = {
        title_name: newTitle.newTitleName,
        author_name: newTitle.authorName,
        illustrator_name: newTitle.illustratorName,
        title_cover_url: newTitle.coverURL,
      };

      const res = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(titleData)
      })

      if (!res.ok) {
        const errData = await res.text()
        throw new Error(`Server error: ${errData}`)
      }

      const savedTitle = await res.json();
      setTitles(prevTitles => [...prevTitles, savedTitle]);
      console.log(res)
    } catch (err) {
      console.log(err.messages);
    }
  };
  
  useEffect(() => {
    // Everytime page is access
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

  return (
    <div className="App">
      <CardsList mangas={titles} onAddTitle={handleAddTitle} />
    </div>
  );
}

export default App;
