import React, { useState, useEffect } from 'react';
import './../App.css';

//Max Levels
const clickMaxLevel = 500;
const autoMaxLevel = 200;
const interestMaxLevel = 20;
const cooldownMaxLevel = 10;

//Main 
function Landing() {

  //Default Status
  const [lang, setLang] = useState(true);
  const [points, setPoints] = useState(0);
  const [clickLevel, setClickLevel] = useState(1);
  const [autoLevel, setAutoLevel] = useState(0);
  const [interestLevel, setInterestLevel] = useState(0);
  const [cooldownLevel, setCooldownLevel] = useState(1);

  //Language Strings
  const langStrings = {
    pointsPerSecondLabel: lang ? 'Points per Second: ' : 'Puntos por Segundo: ',
    pointsLabel: lang ? 'Points: ' : 'Puntos: ',
    clickLevelLabel: lang ? 'Click Level: ' : 'Nivel Click: ',
    autoClickLevelLabel: lang ? 'Auto-Click Level: ' : 'Nivel Auto-Click: ',
    interestLevelLabel: lang ? 'Compound Interest: ' : 'Interes Compuesto: ',
    cooldownLevelLabel: lang ? 'Delay: ' : 'Espera: ',
    costLabel: lang ? 'Cost: ' : 'Precio: ',
    saveGameLabel: lang ? 'Save Game' : 'Guardar Partida',
    changeLanguageLabel: lang ? 'Change Language' : 'Cambiar Lenguage',
    maxedOutAlert: lang ? "Can't upgrade anymore, Maxed out" : "No se puede mejorar mas, Nivel maximo",
    hardResetLabel: lang ? 'Hard Reset' : 'Reinicio Duro',
    hardResetAlert: lang ? "Are you sure you want to reset?" : "Seguro que quieres reiniciar?",
    creditsLabel: lang ? 'By GrimIDK, just for fun.' : 'Por GrimIDK, por que puedo.',
    buyLabel: lang ? 'Buy' : 'Comprar',
    buyMaxLabel: lang ? 'Buy Max' : 'Comprar Maximo',
  };

  //Cost Functions
  const clickUpgradeCost = (level) => {return level * 10};
  const autoUpgradeCost = (level) => {return (level + 1) * 50};
  const interestUpgradeCost = (level) => {return (level + 1) * 1500};
  const cooldownUpgradeCost = (level) => {return level * 5000};

  //Hard Reset
  const reset = () => {
    if (window.confirm(langStrings.hardResetAlert)) {
      setPoints(0);
      setClickLevel(1);
      setAutoLevel(0);
      setInterestLevel(0);
      setCooldownLevel(1);
    }
  };

  //Upgrade Handlers
  const upgrade = (level, cost, setLevel, maxLevel) => {
    if (level < maxLevel) {
      if (points >= cost) {
        setPoints(prevPoints => prevPoints - cost);
        setLevel(level => level + 1);
      }
    } else {
      window.alert(langStrings.maxedOutAlert);
    }
  };
  const maxUpgrade = (level, costFunction, setLevel, maxLevel) => {
    if (level >= maxLevel) {
      window.alert(langStrings.maxedOutAlert);
      return;
    }
    let totalCost = 0;
    let currentLevel = level;
    while (currentLevel < maxLevel && totalCost + costFunction(currentLevel) <= points) {
      totalCost += costFunction(currentLevel);
      currentLevel++;
    }
    setPoints(prevPoints => prevPoints - totalCost);
    setLevel(currentLevel);
  };

  //Main Click Upgredes
  const clickUpgrade = () => {
    upgrade(clickLevel, clickUpgradeCost(clickLevel), setClickLevel, clickMaxLevel);
  };
  const clickMaxUpgrade = () => {
    maxUpgrade(clickLevel, clickUpgradeCost, setClickLevel, clickMaxLevel);
  };

  //Auto Click Upgrades
  const autoUpgrade = () => {
    upgrade(autoLevel, autoUpgradeCost(autoLevel), setAutoLevel, autoMaxLevel);
  };
  const autoMaxUpgrade = () => {
    maxUpgrade(autoLevel, autoUpgradeCost, setAutoLevel, autoMaxLevel);
  };

  //Interest Upgrades
  const interestUpgrade = () => {
    upgrade(interestLevel, interestUpgradeCost(interestLevel), setInterestLevel, interestMaxLevel);
  };
  const interestMaxUpgrade = () => {
    maxUpgrade(interestLevel, interestUpgradeCost, setInterestLevel, interestMaxLevel);
  };

  //Cooldown Upgrades
  const cooldownUpgrade = () => {
    upgrade(cooldownLevel, cooldownUpgradeCost(cooldownLevel), setCooldownLevel, cooldownMaxLevel);
  };
  const cooldownMaxUpgrade = () => {
    maxUpgrade(cooldownLevel, cooldownUpgradeCost, setCooldownLevel, cooldownMaxLevel);
  };

  //Language Toggle
  const toggleLang = () => {
    setLang(prevLang => !prevLang);
  };

  //Save
  const saveData = () => {
    const dataToSave = {
      Points: points,
      ClickLevel: clickLevel,
      AutoLevel: autoLevel,
      InterestLevel: interestLevel,
      CooldownLevel: cooldownLevel,
    };
    for (const key in dataToSave) {
      localStorage.setItem(key, dataToSave[key]);
    }
    console.log("Successfully Saved!");
  };

  //Auto Load
  useEffect(() => {
    const keysToLoad = ["Points", "ClickLevel", "AutoLevel", "InterestLevel", "CooldownLevel"];
    const loadedData = keysToLoad.reduce((acc, key) => {
      const savedValue = localStorage.getItem(key);
      if (!isNaN(savedValue) && savedValue !== null) {
        acc[key] = Number(savedValue);
      }
      return acc;
    }, {});
    Object.keys(loadedData).forEach((key) => {
      switch (key) {
        case "Points":
          setPoints(loadedData[key]);
          break;
        case "ClickLevel":
          setClickLevel(loadedData[key]);
          break;
        case "AutoLevel":
          setAutoLevel(loadedData[key]);
          break;
        case "InterestLevel":
          setInterestLevel(loadedData[key]);
          break;
        case "CooldownLevel":
          setCooldownLevel(loadedData[key]);
          break;
        default:
          break;
      }
    });
    console.log("Successfully Loaded!");
  }, []);  

  //Auto Click
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (autoLevel > 0) {
        setPoints(prevPoints => prevPoints + (autoLevel * clickLevel));
      }
    }, Math.round(1000 / cooldownLevel));
    return () => clearInterval(intervalId);
  }, [clickLevel, autoLevel, cooldownLevel]);

  //Compound Interest
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (interestLevel > 0) {
        setPoints(prevPoints => prevPoints + Math.round(prevPoints * (interestLevel/1000)));
      }
    }, Math.round(1000 / cooldownLevel));
    return () => clearInterval(intervalId);
  }, [clickLevel, interestLevel, cooldownLevel]);

  //Auto Save
  useEffect(() => {
    const intervalId = setInterval(saveData, 30000);
    return () => clearInterval(intervalId);
  }, [points, clickLevel, autoLevel, interestLevel, cooldownLevel]);

  //Stats
  const autoClickPerSecond = ((autoLevel * clickLevel) * cooldownLevel);
  const interestPerSecond = (Math.round(interestLevel/1000 * points)) * cooldownLevel;
  const pointsPerSecond = autoClickPerSecond + interestPerSecond;

  //Return
  return (
    <>
      <section className="header">
        <h1>Grim Clicker</h1>
      </section>
      <div className="indicator">{langStrings.pointsPerSecondLabel} {pointsPerSecond}</div>
      <button className="button" id="mainClick" onClick={() => setPoints(prevPoints => prevPoints + clickLevel)}>{langStrings.pointsLabel} {Math.round(points)}</button>
      <section className="shop">
        <div>
          <button className="button" id="clickUpgrade" onClick={clickUpgrade}>{langStrings.clickLevelLabel} {clickLevel}</button>
          <button className="button" onClick={clickMaxUpgrade}>{langStrings.buyMaxLabel}</button>
          <div className="indicator">{langStrings.costLabel} {clickUpgradeCost(clickLevel)}</div>
        </div>
        <div>
          <button className="button" id="autoUpgrade" onClick={autoUpgrade}>{langStrings.autoClickLevelLabel} {autoLevel}</button>
          <button className="button" onClick={autoMaxUpgrade}>{langStrings.buyMaxLabel}</button>
          <div className="indicator">{langStrings.costLabel} {autoUpgradeCost(autoLevel)}</div>
        </div>
        <div>
          <button className="button" id="interestUpgrade" onClick={interestUpgrade}>{langStrings.interestLevelLabel} {interestLevel/10}%</button>
          <button className="button" onClick={interestMaxUpgrade}>{langStrings.buyMaxLabel}</button>
          <div className="indicator">{langStrings.costLabel} {interestUpgradeCost(interestLevel)}</div>
        </div>
        <div>
          <button className="button" id="cooldownUpgrade" onClick={cooldownUpgrade}>{langStrings.cooldownLevelLabel} {Math.round((1000 / cooldownLevel))} ms</button>
          <button className="button" onClick={cooldownMaxUpgrade}>{langStrings.buyMaxLabel}</button>
          <div className="indicator">{langStrings.costLabel} {cooldownUpgradeCost(cooldownLevel)}</div>
        </div>
      </section>
      <section className="settings">
        <button className="button" id="save" onClick={saveData}>{langStrings.saveGameLabel}</button>
        <button className="button" id="lang" onClick={toggleLang}>{langStrings.changeLanguageLabel}</button>
        <button className="button" id="reset" onClick={reset}>{langStrings.hardResetLabel}</button>
      </section>
      <section className="credits">
        <div>{langStrings.creditsLabel}</div>
      </section>
    </>
  );
}

export default Landing;
