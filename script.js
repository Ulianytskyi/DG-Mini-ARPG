const gameField = document.getElementById('game-field');

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const player = document.createElement('div');
player.className = 'player';
gameField.appendChild(player);

function generateEnemy(number) {
  for (let i = 0; i < number; i++) {
    const enemy = document.createElement('div');
    enemy.className = 'enemy';
    enemy.style.top = getRandomCoords(screenHeight) + 'px';
    enemy.style.left = getRandomCoords(screenWidth) + 'px';
    gameField.appendChild(enemy);
  }
}

function getRandomCoords(area) {
  let coord = Math.floor(Math.random() * area - 50) - 50; 
  return coord <= 10 ? 150 : coord;
}

generateEnemy(3);

let positionX = 0;
let positionY = 0;

document.addEventListener('keydown', function(event) {
    let newPositionX = positionX;
    let newPositionY = positionY;

    if (event.key === 'd') {
      newPositionX += 10;
    } else if (event.key === 'a') {
      newPositionX -= 10;
    } else if (event.key === 's') {
      newPositionY += 10;
    } else if (event.key === 'w') {
      newPositionY -= 10;
    }

    if (newPositionX >= 0 && newPositionX <= (screenWidth - player.clientWidth)) {
      positionX = newPositionX;
    }
  
    if (newPositionY >= 0 && newPositionY <= (screenHeight - player.clientHeight)) {
      positionY = newPositionY;
    }

    player.style.left = positionX + 'px';
    player.style.top = positionY + 'px';
});

document.addEventListener('click', (e)=> {
    if (e.target === player) {
        console.log('click');

    }
})