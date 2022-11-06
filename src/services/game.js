import * as ml5 from "ml5";

import { CELL_SIZE, SCREEN_WIDTH, SCREEN_HEIGHT } from "../services/constants";
import Block from "./block.js";

var cursors;
var score = 0;
var levelLines = 0; //number of lines for that level
var level = 0;
var scoreText;
var levelText;
var speechButton;
var paused = false;
var pauseButton;
var restartButton;
var stepCount = 0;
var stepMod = 25;
var pressMod = 10;
var audioOn = false;
//int, tells us which block it is
//I block cyan, O block yellow, S block green, Z block red, T block purple, L block orange, J block blue
var hasLanded = true;
var gridInfo = Array(20)
  .fill()
  .map(() => Array(10).fill(-1)); //-1 is unoccupied
var currBlock = new Block(Math.floor(Math.random() * 7), gridInfo);
var rectGrid = [];

var classifier;

export function preload() {
  restart();
  classifier = ml5.soundClassifier("SpeechCommands18w", {}, () =>
    console.info("Model ready.")
  );
}

export function create() {
  for (let i = 0; i < 20; i++) {
    let rectRow = [];
    for (let j = 0; j < 10; j++) {
      let rect = this.add.rectangle(
        SCREEN_WIDTH / 2 - CELL_SIZE * 5 + j * CELL_SIZE,
        SCREEN_HEIGHT / 2 - CELL_SIZE * 10 + i * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE,
        0x0a0a0a
      );
      rect.setStrokeStyle(1, 0xffffff);
      rectRow.push(rect);
    }
    rectGrid.push(rectRow);
  }

  //  Input Events
  cursors = this.input.keyboard.createCursorKeys();

  scoreText = this.add.text(SCREEN_WIDTH / 2 - CELL_SIZE * 5, 0, "Score: 0", {
    fontSize: "32px",
    fill: "#FFF",
  });

  levelText = this.add.text(SCREEN_WIDTH / 2 - CELL_SIZE * 5, 40, "Level: 0", {
    fontSize: "32px",
    fill: "#FFF",
  });

  speechButton = this.add
    .text(
      SCREEN_WIDTH / 2 + CELL_SIZE * 5 + 10,
      SCREEN_HEIGHT / 2 + CELL_SIZE * 7,
      "Turn On Audio\nControls",
      {
        fontSize: "20px",
        stroke: "#FFF",
        fill: "#FFF",
        padding: 10,
      }
    )
    .setInteractive({ useHandCursor: true })
    .on("pointerdown", () => {
      audioOn = !audioOn;
      if (audioOn) speechButton.setText("Turn Off Audio\nControls");
      else speechButton.setText("Turn On Audio\nControls");
    });

  pauseButton = this.add
    .text(
      SCREEN_WIDTH / 2 + CELL_SIZE * 5 + 10,
      SCREEN_HEIGHT / 2 + CELL_SIZE * 3,
      "Pause",
      {
        fontSize: "20px",
        stroke: "#FFF",
        fill: "#FFF",
        padding: 10,
      }
    )
    .setInteractive({ useHandCursor: true })
    .on("pointerdown", () => {
      paused = !paused;
      if (paused) pauseButton.setText("Resume");
      else pauseButton.setText("Pause");
    });

  restartButton = this.add
    .text(
      SCREEN_WIDTH / 2 + CELL_SIZE * 5 + 10,
      SCREEN_HEIGHT / 2 + CELL_SIZE * 5,
      "Restart",
      {
        fontSize: "20px",
        stroke: "#FFF",
        fill: "#FFF",
        padding: 10,
      }
    )
    .setInteractive({ useHandCursor: true })
    .on("pointerdown", () => {
      restart();
    });
}

export function update() {
  if (paused) return;
  if (currBlock.checkLose()) return true; //return true;

  hasLanded = currBlock.landed();

  if (hasLanded) genBlock();
  else if (stepCount % (stepMod - level) === 0) {
    currBlock.moveDown();
  }

  // left/right/up movements
  if (cursors.left.isDown && stepCount % pressMod === 0) currBlock.moveLeft();
  if (cursors.right.isDown && stepCount % pressMod === 0) currBlock.moveRight();
  if (cursors.down.isDown && stepCount % pressMod === 0) currBlock.moveDown();

  //hard drop
  if (cursors.space.isDown && stepCount % ((4 * pressMod) / 5) === 0)
    currBlock.hardDrop();

  // rotate
  if (cursors.up.isDown && stepCount % ((3 * pressMod) / 5) === 0)
    currBlock.rotate(true);
  //if (cursors.z.isDown && stepCount % ((3 * pressMod) / 5) === 0)
  //currBlock.rotate(false);

  if (stepCount % stepMod === 0) {
    classifier.classify(function (error, result) {
      if (error) {
        console.error();
        return;
      }
      let sound = result[0].label;
      switch (audioOn && !paused ? sound : "") {
        case "left":
          currBlock.moveLeft();
          break;
        case "right":
          currBlock.moveRight();
          break;
        case "go":
          currBlock.moveDown(); //hard drop
          break;
        case "down":
          currBlock.hardDrop();
          break;
        case "up":
          currBlock.rotate(true);
          break;
        default:
          break;
      }
    });
  }

  checkRows();

  repaint();

  scoreText.setText("Score: " + score);
  levelText.setText("Level: " + level);
  stepCount++;
}

function genBlock() {
  let id = Math.floor(Math.random() * 7);
  currBlock.newBlock(id);
}

function restart() {
  gridInfo = Array(20)
    .fill()
    .map(() => Array(10).fill(-1));
  currBlock = new Block(Math.floor(Math.random() * 7), gridInfo);
  level = 0;
  score = 0;
  levelLines = 0;
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
      for (let k = i; k > 0; k--) {
        gridInfo[k] = gridInfo[k - 1];
      }
      gridInfo[0] = new Array(gridInfo[0].length).fill(-1);
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
      rect.setAlpha([0.8]);
      switch (gridInfo[i][j]) {
        case -1:
          rect.setFillStyle("0x121212");
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
  for (let i = 0; i < 4; i++) {
    let rect = rectGrid[currBlock.blockY[i]][currBlock.blockX[i]];
    rect.setAlpha([0.8]);
    switch (currBlock.id) {
      case -1:
        rect.setFillStyle("0x121212");
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
//I block cyan, O block yellow, S block green, Z block red, T block purple, L block orange, J block blue
//0: I block, 1: O block, 2: S block, 3: Z block, 4: T block, 5: L block, 6: J block
