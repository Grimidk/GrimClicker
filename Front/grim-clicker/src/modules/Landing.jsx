import * as React from 'react'
import { useState } from 'react'
import './../App.css'

function Landing() {
  const [points, setPoints] = useState(0)
  const [clickLevel, setLevel] = useState(1)
  return (
    <>
      <button type="button" id="mainClick" onClick={() => setPoints((points) => points + clickLevel)}>Points: {points}</button>
      <button type="button" id="mainUpgrade" onClick={() => setLevel((clickLevel) => clickLevel + 1)}>Level: {clickLevel}</button>
    </>
  )
}

export default Landing
