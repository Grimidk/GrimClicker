import * as React from 'react'
import { useState } from 'react'
import './../App.css'
import Header from './Header'

function Landing() {
  const [points, setPoints] = useState(0)
  const [clickLevel, setClickLevel] = useState(1)
  const upgradeCost = clickLevel * 10

  const upgrade = () => {
    if (points >= upgradeCost) {
      setPoints(points - upgradeCost);
      setClickLevel(clickLevel + 1); 
    }
  }

  return (
    <>
      <Header></Header>
        <button type="button" id="mainClick" onClick={() => setPoints((points) => points + clickLevel)}>Points: {points}</button>
        <button type="button" id="mainUpgrade" onClick={upgrade}>Level: {clickLevel}</button>
    </>
  )
}

export default Landing
