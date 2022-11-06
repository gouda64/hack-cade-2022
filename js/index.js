const GRID_WIDTH = 300;
const GRID_HEIGHT = GRID_WIDTH * 2;
const CELL_SIZE = GRID_WIDTH / 10;
const SCREEN_WIDTH = 600;
const SCREEN_HEIGHT = 800;

var config = {
  type: Phaser.AUTO,
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var cursors;
var score = 0;
var levelLines = 0; //numeber of lines for that level
var level = 0;
var gameOver = false;
var scoreText;
var currBlock;
//int, tells us which block it is
//I block cyan, O block yellow, S block green, Z block red, T block purple, L block orange, J block blue
var hasLanded = true;
var setBlocks;
var gridInfo = new Array(20).fill(Array(10).fill(-1)); //0 is unoccupied

var game = new Phaser.Game(config);

function preload() {}

function create() {
  var grid = this.add.grid(
    SCREEN_WIDTH / 2,
    SCREEN_HEIGHT / 2,
    GRID_WIDTH,
    GRID_HEIGHT,
    CELL_SIZE,
    CELL_SIZE,
    0xffffff
  );

  //  Input Events
  cursors = this.input.keyboard.createCursorKeys();

  scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "32px",
    fill: "#FFF",
  });
}

function update() {
  if (checkLose()) return;

  hasLanded = currBlock.landed();

  if (hasLanded) genBlock();
  else currBlock.moveDown();

  // left/right/up movements
  if (cursors.left.isDown) currBlock.moveLeft();
  if (cursors.right.isDown) currBlock.moveRight();
  if (cursors.down.isDown) {
    currBlock.moveDown();
    score++; //you get 1 point per tile for soft drop
  }

  // rotate
  if (cursors.up.isDown) currBlock.rotate(true);

  repaint();

  scoreText = this.add.text(16, 16, "score:" + score, {
    fontSize: "32px",
    fill: "#FFF",
  });
}

function genBlock() {
  let id = Math.floor(Math.random() * 7);
  currBlock.newBlock(id);
}

function checkRows(grid) {
  let linesAtOnce = 0;
  for (let i = 0; i < 20; i++) {
    let isFull = true;
    for (let k = 0; k < 10; k++) {
      if (grid[i][k] == -1) {
        isFull = false;
        break;
      }
    }
    if (isFull) {
      for (let k = i; k < 19; k++) {
        grid[k] = grid[k + 1];
      }
      grid[19] = new Array(10).fill(-1);
      linesAtOnce++;
      i--;
    }
  }
  levelLines += linesAtOnce;
  if (levelLines >= 10) {
    level++;
    levelLines -= 10;
  }
  switch (linesAtOnce) {
    case 1:
      score += 40 * (level + 1);
      break;
    case 2:
      score += 100 * (level + 1);
      break;
    case 3:
      score += 300 * (level + 1);
      break;
    case 4:
      score += 1200 * (level + 1);
      break;
  }
}

function hardDrop() {
  score += (20 - currBlock.blockY[0]) * 2;
  currBlock.hardDrop();
}

function repaint() {
  for (let k = 0; k < 20; k++) {
    for (let j = 0; j < 10; j++) {}
  }
}
