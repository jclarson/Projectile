const size = 30; // size of ball
const balls = []; // array to hold all free balls
let gravity = 1;

// this function makes a ball with position and velocity set
function makeBall(xcoord, ycoord, color, velx = 0, vely = 0, fixed = 0) {
  let statObj = {x: xcoord, y: ycoord, velx: velx, vely: vely};
  ball = document.createElement("div");
  ball.style.backgroundColor = color;
  ball.className = "ball";
  ball.style.height = ball.style.width = size;
  ball.style.top = ycoord;
  ball.style.left = xcoord;
  document.body.appendChild(ball);
  
  if (!fixed) {
    // only free balls will be updated
    balls.push([ball,statObj]);
  }
}

function checkWalls(stat) {
  if (stat.x < 0) {
    stat.velx = -stat.velx;
    stat.x = 0;
  } else if (stat.x > (800 - size)) {
    stat.velx = -stat.velx;
    stat.x = 800 - size;
  }

  if (stat.y < 0) {
    stat.y = 0;
  } else if (stat.y > (400 - size)) {
    stat.vely = -stat.vely;
    stat.y = 400 - size;
  }
}

function update() {
  for (let i = 0; i < balls.length; i++) {
    let stat = balls[i][1];
    stat.x += stat.velx;
    stat.vely += gravity;
    stat.y += stat.vely;
    checkWalls(stat);

    balls[i][0].style.left = stat.x
    balls[i][0].style.top = stat.y
  }
  setTimeout(update, 100); // this calls update every 1/10 second
}

function getRandom(scale) {
  return Math.random() * scale;
}

function randomColor() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

function factory(total) {
  // check how many balls exist already and add to the array
  for (let i = balls.length; i < total; i++) {
    let velx = Math.floor(getRandom(20) - 10);
    let vely = Math.floor(getRandom(20) - 10);
    makeBall(getRandom(800 - size), getRandom(400 - size), randomColor(), velx, vely, 0);
  }
  update();
}

factory(10);