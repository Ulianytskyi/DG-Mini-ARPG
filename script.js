const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const player = {
  x: 50,
  y: 50,
  width: 50,
  height: 50,
  img: {
    original: new Image(),
    mirrored: new Image()
  },
  direction: 1,
  targetX: 50,
  targetY: 50
};

player.img.original.src = 'webp_ncage_1.png';
player.img.mirrored.src = 'webp_ncage_2.png';

const menuField = {
  x: 50,
  y: 50,
  width: 150,
  height: 200,
  visible: false
};

canvas.width = screenWidth;
canvas.height = screenHeight;

canvas.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  menuField.visible = !menuField.visible;
});

canvas.addEventListener('click', (event) => {
  const x = event.clientX;
  const y = event.clientY;

  if (x < player.x + player.width / 2) {
    player.direction = -1;
  } else {
    player.direction = 1;
  }

  player.targetX = Math.max(player.width / 2, Math.min(screenWidth - player.width / 2, x));
  player.targetY = Math.max(player.height / 2, Math.min(screenHeight - player.height / 2, y));

  menuField.visible = false;
});

function updatePlayer() {
  const speed = 3;

  const dx = player.targetX - player.x;
  const dy = player.targetY - player.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > speed) {
    const angle = Math.atan2(dy, dx);
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    player.x += vx;
    player.y += vy;
  } else {
    player.x = player.targetX;
    player.y = player.targetY;
  }
}

function draw() {
  context.clearRect(0, 0, screenWidth, screenHeight);

  if (player.direction === 1) {
    context.drawImage(player.img.original, player.x - player.width / 2, player.y - player.height / 2, player.width, player.height);
  } else {
    context.drawImage(player.img.mirrored, player.x - player.width / 2, player.y - player.height / 2, player.width, player.height);
  }

  if (menuField.visible) {
    context.fillStyle = 'blueviolet';
    context.fillRect(menuField.x, menuField.y, menuField.width, menuField.height);
  }

  requestAnimationFrame(draw);
  updatePlayer();
}

draw();
