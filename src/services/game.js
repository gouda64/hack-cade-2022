// https://phaser.io/examples/v2/groups/align-sprites-to-grid

import { CELL_SIZE, SCREEN_WIDTH, SCREEN_HEIGHT } from "../services/constants";

import Block from "./block.js";

var cursors;
var score = 0;
var levelLines = 0; //numeber of lines for that level
var level = 0;
var gameOver = false;
var scoreText;
var levelText;
//int, tells us which block it is
//I block cyan, O block yellow, S block green, Z block red, T block purple, L block orange, J block blue
var hasLanded = true;
var setBlocks;
var gridInfo = Array(20)
  .fill()
  .map(() => Array(10).fill(-1)); //-1 is unoccupied
var currBlock = new Block(Math.floor(Math.random() * 7), gridInfo);
var rectGrid = [];

export function preload() {}

export function create() {
  for (let i = 0; i < 20; i++) {
    let rectRow = [];
    for (let j = 0; j < 10; j++) {
      rectRow.push(
        this.add.rectangle(
          SCREEN_WIDTH / 2 - CELL_SIZE * 5 + j * CELL_SIZE,
          SCREEN_HEIGHT / 2 - CELL_SIZE * 10 + i * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE,
          0xffffff
        )
      );
    }
    rectGrid.push(rectRow);
  }

  //  Input Events
  cursors = this.input.keyboard.createCursorKeys();

  scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "32px",
    fill: "#FFF",
  });

  levelText = this.add.text(16, 56, "level: 0", {
    fontSize: "32px",
    fill: "#FFF",
  });
}

export function update() {
  if (gameOver) return;

  hasLanded = currBlock.landed();

  if (hasLanded) genBlock();
  else currBlock.moveDown();

  // left/right/up movements
  if (cursors.left.isDown) currBlock.moveLeft();
  if (cursors.right.isDown) currBlock.moveRight();
  if (cursors.down.isDown) currBlock.moveDown();

  // rotate
  if (cursors.up.isDown) currBlock.rotate(true);

  repaint();

  scoreText.setText("score: " + score);
  levelText.setText("level: " + level);
}

function genBlock() {
  let id = Math.floor(Math.random() * 7);
  currBlock.newBlock(id);
}

function checkRows() {
  let linesAtOnce = 0;
  for (let i = 0; i < 20; i++) {
    let isFull = true;
    for (let k = 0; k < 10; k++) {
      if (gridInfo[i][k] === -1) {
        isFull = false;
        break;
      }
    }
    if (isFull) {
      for (let k = i; k < 19; k++) {
        gridInfo[k] = gridInfo[k + 1];
      }
      gridInfo[19] = new Array(10).fill(-1);
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
    default:
      break;
  }
}

function repaint() {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      var rect = rectGrid[i][j];
      switch (gridInfo[i][j]) {
        case -1:
          rect.setFillStyle("0xFFFFFF");
          break;
        case 0:
          rect.setFillStyle("0x00FFFF");
          break;
        case 1:
          rect.setFillStyle("0xFFFF00");
          break;
        case 2:
          rect.setFillStyle("0x00FF00");
          break;
        case 3:
          rect.setFillStyle("0xFF0000");
          break;
        case 4:
          rect.setFillStyle("0xFF00FF");
          break;
        case 5:
          rect.setFillStyle("0xFFA500");
          break;
        case 6:
          rect.setFillStyle("0x0000FF");
          break;
        default:
          break;
      }
    }
  }
}
//I block cyan, O block yellow, S block green, Z block red, T block purple, L block orange, J block blue
//0: I block, 1: O block, 2: S block, 3: Z block, 4: T block, 5: L block, 6: J block
