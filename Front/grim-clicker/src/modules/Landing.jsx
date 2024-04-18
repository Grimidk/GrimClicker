import React, { useState, useEffect } from 'react';
import Header from './Header';
import './../App.css';

const clickMaxLevel = 100;
const autoMaxLevel = 100;
const cooldownMaxLevel = 20;

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
    const upgradesToTrigger = Math.min(remainingUpgrades, maxLevel);
    for (let i = 0; i < upgradesToTrigger; i++) {
      upgradeFunction();
    };
  };
  
  const clickUpgrade = () => {
    triggerUpgrades(() => upgrade(clickLevel, clickUpgradeCost, setClickLevel, clickMaxLevel), clickUpgradeCost, clickLevel, clickMaxLevel);
  };

  const autoUpgrade = () => {
    triggerUpgrades(() => upgrade(autoLevel, autoUpgradeCost, setAutoLevel, autoMaxLevel), autoUpgradeCost, autoLevel, autoMaxLevel);
  };

  const cooldownUpgrade = () => {
    triggerUpgrades(() => upgrade(cooldownLevel, cooldownUpgradeCost, setCooldownLevel, cooldownMaxLevel), cooldownUpgradeCost, cooldownLevel, cooldownMaxLevel);
  };

  const saveData = () => {
    localStorage.setItem("Points", points);
    localStorage.setItem("ClickLevel", clickLevel);
    localStorage.setItem("AutoLevel", autoLevel);
    localStorage.setItem("CooldownLevel", cooldownLevel);
    console.log("Successfully Saved!");
  };

  useEffect(() => {
    const savedPoints = localStorage.getItem("Points");
    const savedClickLevel = localStorage.getItem("ClickLevel");
    const savedAutoLevel = localStorage.getItem("AutoLevel");
    const savedCooldownLevel = localStorage.getItem("CooldownLevel");
  
    if (!isNaN(savedPoints) && savedPoints !== null) {setPoints(Number(savedPoints));};
    if (!isNaN(savedClickLevel) && savedClickLevel !== null) {setClickLevel(Number(savedClickLevel));};
    if (!isNaN(savedAutoLevel) && savedAutoLevel !== null) {setAutoLevel(Number(savedAutoLevel));};
    if (!isNaN(savedCooldownLevel) && savedCooldownLevel !== null) {setCooldownLevel(Number(savedCooldownLevel));};
  
    console.log("Successfully Loaded!");
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (autoLevel > 0) {
        setPoints(prevPoints => prevPoints + (autoLevel * clickLevel));
      }
    }, Math.round(1000 / cooldownLevel));
    return () => clearInterval(intervalId);
  }, [autoLevel, clickLevel, cooldownLevel]);

  useEffect(() => {
    const intervalId = setInterval(saveData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const pointsPerSecond = (autoLevel * clickLevel) * cooldownLevel;

  return (
    <>
      <Header />
      <div className="indicator">Points per Second: {pointsPerSecond}</div>
      <button className="button" id="mainClick" onClick={() => setPoints(prevPoints => prevPoints + clickLevel)}>Points: {points}</button>
      <div className='shop'>
        <div>
          <button className="button" id="clickUpgrade" onClick={clickUpgrade}>Click Level: {clickLevel}</button>
          <button className="button" onClick={() => triggerUpgrades(() => upgrade(clickLevel, clickUpgradeCost, setClickLevel, clickMaxLevel), clickUpgradeCost, clickLevel, clickMaxLevel)}>Max</button>
          <div className="indicator">Cost: {clickUpgradeCost}</div>
        </div>
        <div>
          <button className="button" id="autoUpgrade" onClick={autoUpgrade}>Auto-Clicker Level: {autoLevel}</button>
          <button className="button" onClick={() => triggerUpgrades(() => upgrade(autoLevel, autoUpgradeCost, setAutoLevel, autoMaxLevel), autoUpgradeCost, autoLevel, autoMaxLevel)}>Max</button>
          <div className="indicator">Cost: {autoUpgradeCost}</div>
        </div>
        <div>
          <button className="button" id="cooldownUpgrade" onClick={cooldownUpgrade}>Cooldown: {Math.round(1000 / cooldownLevel)} ms</button>
          <button className="button" onClick={() => triggerUpgrades(() => upgrade(cooldownLevel, cooldownUpgradeCost, setCooldownLevel, cooldownMaxLevel), cooldownUpgradeCost, cooldownLevel, cooldownMaxLevel)}>Max</button>
          <div className="indicator">Cost: {cooldownUpgradeCost}</div>
        </div>
      </div>
      <div className="settings">
        <button className="button" id="save" onClick={saveData}>Save Data</button>
        <button className="button" id="reset" onClick={reset}>Hard Reset</button>
      </div>
      <div className="credits">By GrimIDK, just for fun.</div>
    </>
  );
}

export default Landing;
