import { useEffect } from "react";
import "./App.css";
import CardsList from "./Components/CardsList";
function App() {
  const mangas = [
    { titleName: "test_a", imageUrl: "/chainsawman.jpg" }, 
    { titleName: "test_b", imageUrl: "/callofthenight.jpg" },
    { titleName: "test_b", imageUrl: "/callofthenight.jpg" },
    { titleName: "test_b", imageUrl: "/callofthenight.jpg" },
    { titleName: "test_b", imageUrl: "/callofthenight.jpg" },
    { titleName: "test_b", imageUrl: "/callofthenight.jpg" },
  ];
  // TODO: Allow User to add manga title, series and volume
  // TODO: 
  return (
    <div className="App">
      <CardsList mangas={mangas} />
    </div>
  );
}

export default App;
