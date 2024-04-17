import * as React from 'react'
import { useState, useEffect } from 'react'
import './../App.css'
import Header from './Header'

function Landing() {
  const [points, setPoints] = useState(0);
  const [clickLevel, setClickLevel] = useState(1);
  const [autoLevel, setAutoLevel] = useState(0);
  const [cooldownLevel, setCooldownLevel] = useState(1);
  const cooldown = 1000/cooldownLevel

  const clickUpgradeCost = clickLevel * 10;
  const autoUpgradeCost = (autoLevel + 1 ) * 25;
  const cooldownUpgradeCost = (cooldownLevel) * 50;

  const clickUpgrade = () => {
    if (points >= clickUpgradeCost) {
      setPoints(points => points - clickUpgradeCost);
      setClickLevel(clickLevel => clickLevel + 1); 
    }
  };

  const autoUpgrade = () => {
    if (points >= autoUpgradeCost) {
      setPoints(points => points - autoUpgradeCost);
      setAutoLevel(autoLevel => autoLevel + 1); 
    }
  };

  const cooldownUpgrade = () => {
    if (points >= cooldownUpgradeCost) {
      setPoints(points => points - cooldownUpgradeCost);
      setCooldownLevel(cooldownLevel => cooldownLevel + 1); 
    }
  };

  useEffect(() => {
    function autoClick() {
      if (autoLevel > 0) {
        setPoints((prevPoints) => prevPoints + (autoLevel * clickLevel));
      }
    }

    const intervalId = setInterval(autoClick, cooldown);
    return () => clearInterval(intervalId);
  }, [autoLevel]);

  return (
    <>
      <Header></Header>
        <button className="button" id="mainClick" onClick={() => setPoints((points) => points + clickLevel)}>Points: {points}</button>
        <div className='shop'>
          <button className="button" id="clickUpgrade" onClick={clickUpgrade}>Click Level: {clickLevel}</button>
          <div>Cost: {clickUpgradeCost}</div>
          <button className="button" id="autoUpgrade" onClick={autoUpgrade}>Auto Level: {autoLevel}</button>
          <div>Cost: {autoUpgradeCost}</div>
          <button className="button" id="cooldownUpgrade" onClick={cooldownUpgrade}>Cooldown Level: {cooldownLevel}</button>
          <div>Cost: {cooldownUpgradeCost}</div>
        </div>
    </>
  )
}

export default Landing
