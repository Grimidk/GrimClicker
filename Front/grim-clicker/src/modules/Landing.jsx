import React, { useState, useEffect } from 'react';
import Header from './Header';
import './../App.css';

const MAX_LEVEL_CLICK = 100;
const MAX_LEVEL_AUTO = 100;
const MAX_LEVEL_COOLDOWN = 20;

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

  const triggerUpgrades = (upgradeFunction, cost, level, maxLevel) => {
    const remainingUpgrades = Math.min(Math.floor(points / cost), maxLevel - level);
    if (level >= maxLevel) {
      window.alert("Can't upgrade anymore, Maxed out");
    }
    if (remainingUpgrades <= 0) {
      return;
    }
    const upgradesToTrigger = Math.min(remainingUpgrades, 10);
    for (let i = 0; i < upgradesToTrigger; i++) {
      upgradeFunction();
    };
  };
  
  const clickUpgrade = () => {
    triggerUpgrades(() => upgrade(clickLevel, clickUpgradeCost, setClickLevel, MAX_LEVEL_CLICK), clickUpgradeCost, clickLevel, MAX_LEVEL_CLICK);
  };

  const autoUpgrade = () => {
    triggerUpgrades(() => upgrade(autoLevel, autoUpgradeCost, setAutoLevel, MAX_LEVEL_AUTO), autoUpgradeCost, autoLevel, MAX_LEVEL_AUTO);
  };

  const cooldownUpgrade = () => {
    triggerUpgrades(() => upgrade(cooldownLevel, cooldownUpgradeCost, setCooldownLevel, MAX_LEVEL_COOLDOWN), cooldownUpgradeCost, cooldownLevel, MAX_LEVEL_COOLDOWN);
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
        <div>
          <button className="button" id="clickUpgrade" onClick={clickUpgrade}>Click Level: {clickLevel}</button>
          <button className="button" onClick={() => triggerUpgrades(() => upgrade(clickLevel, clickUpgradeCost, setClickLevel, MAX_LEVEL_CLICK), clickUpgradeCost, clickLevel, MAX_LEVEL_CLICK)}>x10</button>
          <div className="indicator">Cost: {clickUpgradeCost}</div>
        </div>
        <div>
          <button className="button" id="autoUpgrade" onClick={autoUpgrade}>Auto-Clicker Level: {autoLevel}</button>
          <button className="button" onClick={() => triggerUpgrades(() => upgrade(autoLevel, autoUpgradeCost, setAutoLevel, MAX_LEVEL_AUTO), autoUpgradeCost, autoLevel, MAX_LEVEL_AUTO)}>x10</button>
          <div className="indicator">Cost: {autoUpgradeCost}</div>
        </div>
        <div>
          <button className="button" id="cooldownUpgrade" onClick={cooldownUpgrade}>Cooldown: {Math.round(1000 / cooldownLevel)} ms</button>
          <button className="button" onClick={() => triggerUpgrades(() => upgrade(cooldownLevel, cooldownUpgradeCost, setCooldownLevel, MAX_LEVEL_COOLDOWN), cooldownUpgradeCost, cooldownLevel, MAX_LEVEL_COOLDOWN)}>x10</button>
          <div className="indicator">Cost: {cooldownUpgradeCost}</div>
        </div>
      </div>
      <div className="settings">
        <button className="button" id="reset" onClick={reset}>Hard Reset</button>
      </div>
    </>
  );
}

export default Landing;
