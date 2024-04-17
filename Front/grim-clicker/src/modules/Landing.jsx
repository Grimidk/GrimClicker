import * as React from 'react'
import { useState, useEffect } from 'react'
import './../App.css'
import Header from './Header'

function Landing() {
  const [points, setPoints] = useState(0);
  const [clickLevel, setClickLevel] = useState(1);
  const [autoLevel, setAutoLevel] = useState(0);
  const [cooldownLevel, setCooldownLevel] = useState(1);

  const cooldown =  Math.round(1000 / cooldownLevel);

  const clickUpgradeCost = clickLevel * 10;
  const autoUpgradeCost = (autoLevel + 1 ) * 25;
  const cooldownUpgradeCost = (cooldownLevel) * 50;

  const reset = () => {
    let text = "Are you sure you want to reset?";
    if (confirm(text) == true) {
      setPoints(0);
      setClickLevel(1);
      setAutoLevel(0);
      setCooldownLevel(1);
      };
  };

  const maxedOut = () => {
    window.alert("Can't upgrade anymore, Maxed out")
  }

  const clickUpgrade = () => {
    if (clickLevel < 100) {
      if (points >= clickUpgradeCost) {
        setPoints(points => points - clickUpgradeCost);
        setClickLevel(clickLevel => clickLevel + 1); 
      }
    } else {
      maxedOut()
    }
  };

  const autoUpgrade = () => {
    if (autoLevel < 100) {
      if (points >= autoUpgradeCost) {
        setPoints(points => points - autoUpgradeCost);
        setAutoLevel(autoLevel => autoLevel + 1); 
      }
    } else {
      maxedOut()
    }
  };

  const cooldownUpgrade = () => {
    if (cooldownLevel < 20) {
      if (points >= cooldownUpgradeCost) {
        setPoints(points => points - cooldownUpgradeCost);
        setCooldownLevel(cooldownLevel => cooldownLevel + 1); 
      }
    } else {
      maxedOut()
    }
  };

  useEffect(() => {
    function autoClick() {
      if (autoLevel > 0) {
        setPoints((prevPoints) => prevPoints + (autoLevel * clickLevel));
      }
    };
    const intervalId = setInterval(autoClick, cooldown);
    return () => clearInterval(intervalId);
  }, [autoLevel]);

  return (
    <>
      <Header></Header>
        <div className="indicator">Points per Second: {(autoLevel * clickLevel) * cooldownLevel}</div>
        <button className="button" id="mainClick" onClick={() => setPoints((points) => points + clickLevel)}>Points: {points}</button>
        <div className='shop'>
          <button className="button" id="clickUpgrade" onClick={clickUpgrade}>Click Level: {clickLevel}</button>
          <div className="indicator">Cost: {clickUpgradeCost}</div>
          <button className="button" id="autoUpgrade" onClick={autoUpgrade}>Auto-Clicker Level: {autoLevel}</button>
          <div className="indicator">Cost: {autoUpgradeCost}</div>
          <button className="button" id="cooldownUpgrade" onClick={cooldownUpgrade}>Cooldown: {cooldown} ms</button>
          <div className="indicator">Cost: {cooldownUpgradeCost}</div>
        </div>
        <div className="settings">
          <button className="button" id="reset" onClick={reset}>Hard Reset</button>
        </div>
    </>
  )
}

export default Landing
