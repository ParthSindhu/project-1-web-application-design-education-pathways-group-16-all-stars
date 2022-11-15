import React from 'react'
import NavbarComp from "./components/Navbar.js";
import ReactComp from "./components/Footer.js";
import './App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


function App() {

  return (
    <div>
    <div className="App">
      <NavbarComp />
    </div>

    <div className="App">
    <ReactComp />
    </div>
    </div>
  );

 

}


export default App;