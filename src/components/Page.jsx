import React, { useState, useEffect, useRef } from 'react';
import Home from "./Home.jsx";
import Dates from "./Dates.jsx";
import '../App.css';
const Page = () => {
  return (
    <div className="App">
      <Home/>
      <Dates />
    </div>
  )
}

export default Page