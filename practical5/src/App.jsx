import { useState } from "react";
import "./App.css";
import Output from "./Output";

function App() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(formData) {
    const name = formData.get("name");
    const age = formData.get("age");
    const fav_pokemon = formData.get("fav_pokemon");
    setSubmitted(true);
    console.log(name, age, fav_pokemon);
  }

  return (
    <>
      {submitted ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
          <form className="form w-full max-w-sm m-4" action={onSubmit}>
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
        <Output name={name} age={age} favPokemon={fav_pokemon} />
      )}
    </>
  );
}

export default App;
