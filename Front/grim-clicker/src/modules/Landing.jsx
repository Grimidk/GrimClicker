import React, { useState, useEffect } from 'react';
import Header from './Header';
import './../App.css';

function Landing() {
  const [points, setPoints] = useState(0);
  const [clickLevel, setClickLevel] = useState(1);
  const [autoLevel, setAutoLevel] = useState(0);
  const [cooldownLevel, setCooldownLevel] = useState(1);

  const clickUpgradeCost = clickLevel * 10;
  const autoUpgradeCost = (autoLevel + 1) * 25;
  const cooldownUpgradeCost = cooldownLevel * 100;

  const reset = () => {
    const text = "Are you sure you want to reset?";
    if (window.confirm(text)) {
      setPoints(0);
      setClickLevel(1);
      setAutoLevel(0);
      setCooldownLevel(1);
    }
  };

  const upgrade = (level, cost, setLevel, maxLevel) => {
    if (level < maxLevel) {
      if (points >= cost) {
        setPoints(prevPoints => prevPoints - cost);
        setLevel(level => level + 1);
      }
    } else {
      window.alert("Can't upgrade anymore, Maxed out");
    }
  };

  const clickUpgrade = () => {
    upgrade(clickLevel, clickUpgradeCost, setClickLevel, 100);
  };

  const autoUpgrade = () => {
    upgrade(autoLevel, autoUpgradeCost, setAutoLevel, 100);
  };

  const cooldownUpgrade = () => {
    upgrade(cooldownLevel, cooldownUpgradeCost, setCooldownLevel, 20);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (autoLevel > 0) {
        setPoints(prevPoints => prevPoints + (autoLevel * clickLevel));
      }
    }, Math.round(1000 / cooldownLevel));
    return () => clearInterval(intervalId);
  }, [autoLevel, clickLevel, cooldownLevel]);

  const pointsPerSecond = (autoLevel * clickLevel) * cooldownLevel;

  return (
    <>
      <Header />
      <div className="indicator">Points per Second: {pointsPerSecond}</div>
      <button className="button" id="mainClick" onClick={() => setPoints(prevPoints => prevPoints + clickLevel)}>Points: {points}</button>
      <div className='shop'>
        <button className="button" id="clickUpgrade" onClick={clickUpgrade}>Click Level: {clickLevel}</button>
        <div className="indicator">Cost: {clickUpgradeCost}</div>
        <button className="button" id="autoUpgrade" onClick={autoUpgrade}>Auto-Clicker Level: {autoLevel}</button>
        <div className="indicator">Cost: {autoUpgradeCost}</div>
        <button className="button" id="cooldownUpgrade" onClick={cooldownUpgrade}>Cooldown: {Math.round(1000 / cooldownLevel)} ms</button>
        <div className="indicator">Cost: {cooldownUpgradeCost}</div>
      </div>
      <div className="settings">
        <button className="button" id="reset" onClick={reset}>Hard Reset</button>
      </div>
    </>
  );
}

export default Landing;
