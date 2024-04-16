import { useState } from 'react'
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'

function App() {
  const [points, setPoints] = useState(0)
  const [clickLevel, setLevel] = useState(1)
  return (
    <>
      <button type="button" id="mainClick" onClick={() => setPoints((points) => points + clickLevel)}>Points: {points}</button>
      <button type="button" id="mainUpgrade" onClick={() => setLevel((clickLevel) => clickLevel + 1)}>Level: {clickLevel}</button>
    </>
  )
}

export default App
