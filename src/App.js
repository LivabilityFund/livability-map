import React from "react";
import MapComponent from "./components/MapComponent";
import "./styles/MapStyles.css";

function App() {
  return (
    <div className="App">
      <header>
        <h1>The Livability Fund</h1>
        <p>Explore livability indicators worldwide at livability.org</p>
      </header>
      <MapComponent />
    </div>
  );
}

export default App;
