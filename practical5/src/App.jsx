import { useState } from "react";
import "./App.css";
import Output from "./Output";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [favPokemon, setFavPokemon] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    setName(formData.get("name"));
    setAge(formData.get("age"));
    setFavPokemon(formData.get("fav_pokemon"));
    setSubmitted(true);
    console.log(name, age, fav_pokemon);
  }

  return (
    <>
      {!submitted ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
          <form className="form w-full max-w-sm m-4" onSubmit={onSubmit}>
            <input
              placeholder="Enter your name"
              className="input"
              type="text"
              name="name"
            />
            <input
              placeholder="Enter your age"
              className="input"
              type="number"
              name="age"
            />
            <input
              placeholder="Enter your favourite pokemon"
              className="input"
              type="text"
              name="fav_pokemon"
            />

            <button>Submit</button>
          </form>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
          <Output name={name} age={age} favPokemon={favPokemon} />
        </div>
      )}
    </>
  );
}

export default App;
