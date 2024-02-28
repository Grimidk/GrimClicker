function mainClick() {
    const pointElement = document.querySelector('#currentPoints');
    let points = pointElement.textContent; 
    const upgradeElement = document.querySelector('#mainClickLvl');
    let mainMultiplier = upgradeElement.textContent; 
    pointElement.textContent = Number(points) + Number(mainMultiplier) + Number(1);
}

function mainUpgrade() {
    const upgradeElement = document.querySelector('#mainClickLvl');
    let mainMultiplier = upgradeElement.textContent; 
    upgradeElement.textContent = Number(mainMultiplier) + Number(1);
}