const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d'); // get canvas context
let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;

// create ball properties
const ball = {
  x: canvas.width / 2, // put in middle horizontally on x axis
  y: canvas.height / 2,
  size: 10,
  speed: 8,
  dx: 4, // speed of direction on x axis
  dy: -4,
};

// create paddle properties

const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

// create brick props
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

function increaseScore() {
  score++;
  if (score % (brickRowCount * brickRowCount) === 0) {
    showAllBricks();
  }
}

function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      brick.visible = true;
    });
  });
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // wall collision detection (x axis) (right/left)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1; // *= - ball.dx = ball.dx * -1
  }

  // wall collision detection (y axis) (top/bottom)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1; // *= - ball.dy = ball.dy * -1
  }
  console.log(`Ball X: ${ball.x} ball Y: ${ball.y}`);

  // Paddle collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  // bricks collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left brick side
          ball.x + ball.size < brick.x + brick.w && // right brick side
          ball.y + ball.size > brick.y && // top brick side
          ball.y - ball.size < brick.y + brick.h // bottom brick side
        ) {
          ball.dy *= -1;
          brick.visible = false;
          increaseScore();
        }
      }
    });
  });
  // hit bottom wall - lose

  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
}

// create bricks
const bricks = [];

for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let k = 0; k < brickColumnCount; k++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = k * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][k] = { x, y, ...brickInfo };
  }
}

// draw bricks on canvas
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
}

// draw paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

// draw ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clr canvas
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

function movePaddle() {
  paddle.x += paddle.dx;
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

function keyDown(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
}

function keyUp(e) {
  console.log('clicked keyup');
  if (
    e.key === 'Right' ||
    e.key === 'ArrowRight' ||
    e.key === 'Left' ||
    e.key === 'ArrowLeft'
  ) {
    paddle.dx = 0;
  }
}

// update canvasa drawing & animation
function update() {
  moveBall();
  movePaddle();
  draw(); // draw everything
  requestAnimationFrame(update); // req animation frame
}

update();

function drawScore() {
  ctx.font = '20px';
  ctx.fillText(`Score ${score}`, canvas.width - 100, 30);
}

// EVENT LISTENERS
rulesBtn.addEventListener('click', () => {
  // OPEN MODAL
  rules.classList.add('show');
});

closeBtn.addEventListener('click', () => {
  // CLOSE MODAL
  rules.classList.remove('show');
});

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
