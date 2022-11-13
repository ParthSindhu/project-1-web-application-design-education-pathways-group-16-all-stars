import React from 'react'
import NavbarComp from "./components/Navbar.js";
import ReactComp from "./components/Footer.js";
import './App.css';


function App() {

  return (
    <div id='MAIN'>
      <div className="App">
        <NavbarComp />
        <ReactComp />
      </div>
    </div>
  );

 

}


export default App;