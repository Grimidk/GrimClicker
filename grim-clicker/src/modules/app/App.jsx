import { useState } from 'react'
import './App.css'

function mainClick() {
  points = Number(points) + Number(clickLevel) + Number(1);
}

function mainUpgrade() {
  clickLevel = Number(clickLevel) + Number(1);
}

function App() {
  const [points, setPoints] = useState(0)
  const [clickLevel, setLevel] = useState(0)

  return (
    <>
      <button type="button" id="mainClick" onClick={() => setPoints((points) => points + clickLevel + 1)}>Points: {points}</button>
      <button type="button" id="mainUpgrade" onClick={() => setLevel((clickLevel) => clickLevel + 1)}>Level: {clickLevel}</button>
    </>
  )
}

export default App
