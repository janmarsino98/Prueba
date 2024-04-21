import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [catFact, setCatFact] = useState(null);
  const [firstFactWord, setFirstFactWord] = useState(null);
  const [catImage, setCatImage] = useState(null);

  useEffect(() => {
    const fetchCatImg = async () => {
      try {
        const response = await fetch(
          `https://cataas.com/cat/says/${firstFactWord}`
        );
        const img = await response.blob();
        const img_url = URL.createObjectURL(img);
        setCatImage(img_url);
      } catch (error) {
        console.error(
          "There was an error while fetching the image from the API: ",
          error
        );
      }
    };
    const fetchCatFact = async () => {
      try {
        const response = await fetch("https://catfact.ninja/fact");
        const data = await response.json();
        const newCatFact = data;
        const newFirstFactWord = data.fact.split(" ")[0];
        setCatFact(newCatFact.fact);
        setFirstFactWord(newFirstFactWord);
      } catch (error) {
        console.error("There was an error while fetching catfact API: ", error);
      }
    };
    fetchCatFact();
    fetchCatImg();
  }, []);

  return (
    <>
      <div className="container">
        <div className="catFact">{catFact}</div>
        <div className="img-container">
          <img src={catImage} alt="Cat image" />
        </div>
      </div>
    </>
  );
}

export default App;
