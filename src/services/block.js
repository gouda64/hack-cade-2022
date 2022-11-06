export default class Block {
  constructor(id, grid) {
    //assume starting from top
    //0: I block, 1: O block, 2: S block, 3: Z block, 4: T block, 5: L block, 6: J block
    this.id = id;
    this.grid = grid;
    this.blockX = [];
    this.blockY = [];
    this.newBlock(id);
  }

  moveDown() {
    if (!this.landed()) this.blockY = this.blockY.map((y) => y + 1);
  }
  moveRight() {
    let notBlocked = true;
    for (let i = 0; i < 4; i++) {
      if (
        this.blockX[i] === 9 ||
        this.grid[this.blockY[i]][this.blockX[i] + 1] !== -1
      ) {
        notBlocked = false;
        break;
      }
    }
    if (notBlocked) {
      this.blockX = this.blockX.map((x) => x + 1);
    }
  }
  moveLeft() {
    let notBlocked = true;
    for (let i = 0; i < 4; i++) {
      if (
        this.blockX[i] === 0 ||
        this.grid[this.blockY[i]][this.blockX[i] - 1] !== -1
      ) {
        notBlocked = false;
        break;
      }
    }
    if (notBlocked) {
      this.blockX = this.blockX.map((x) => x - 1);
    }
  }

  rotate(clockwise) {
    if (this.id === 1) return;

    let newX = [];
    let newY = [];
    let canRotate = true;
    for (var i = 0; i < 4; i++) {
      if (clockwise) {
        newX[i] = this.blockY[i] - this.blockY[0] + this.blockX[0];
        newY[i] = -(this.blockX[i] - this.blockX[0]) + this.blockY[0];
      } else {
        newX[i] = -(this.blockY[i] - this.blockY[0]) + this.blockX[0];
        newY[i] = this.blockX[i] - this.blockX[0] + this.blockY[0];
      }
      if (canRotate) {
        canRotate = !(
          newX[i] < 0 ||
          newX[i] >= 10 ||
          newY[i] >= 20 ||
          newY[i] < 0 ||
          this.grid[newY[i]][newX[i]] !== -1
        );
      }
    }

    if (!canRotate) {
      if (
        Math.min(Math.min(newX[0], newX[1]), Math.min(newX[2], newX[3])) < 0
      ) {
        canRotate = true;
        for (let i = 0; i < 4; i++) {
          newX[i]++;
          canRotate = !(newX[i] < 0 || this.grid[newY[i]][newX[i]] !== -1);
          if (!canRotate) break;
        }
        if (!canRotate) {
          canRotate = true;
          for (let i = 0; i < 4; i++) {
            newX[i]++;
            canRotate = !(newX[i] < 0 || this.grid[newY[i]][newX[i]] !== -1);
            if (!canRotate) break;
          }
        }
      } else if (
        Math.max(Math.max(newX[0], newX[1]), Math.max(newX[2], newX[3])) >= 10
      ) {
        canRotate = true;
        for (let i = 0; i < 4; i++) {
          newX[i]--;
          canRotate = !(newX[i] >= 10 || this.grid[newY[i]][newX[i]] !== -1);
          if (!canRotate) break;
        }
        if (!canRotate) {
          canRotate = true;
          for (let i = 0; i < 4; i++) {
            newX[i]--;
            canRotate = !(newX[i] >= 10 || this.grid[newY[i]][newX[i]] !== -1);
            if (!canRotate) break;
          }
        }
      } else if (
        Math.max(Math.max(newY[0], newY[1]), Math.max(newY[2], newY[3])) >= 20
      ) {
        canRotate = true;
        for (let i = 0; i < 4; i++) {
          newY[i]--;
          canRotate = !(newY[i] >= 20 || this.grid[newY[i]][newX[i]] !== -1);
          if (!canRotate) break;
        }
        if (!canRotate) {
          canRotate = true;
          for (let i = 0; i < 4; i++) {
            newY[i]--;
            canRotate = !(newY[i] >= 20 || this.grid[newY[i]][newX[i]] !== -1);
            if (!canRotate) break;
          }
        }
      }
    }

    if (canRotate) {
      this.blockX = newX;
      this.blockY = newY;
    }
  }

  hardDrop() {
    unicorn: while (true) {
      for (let i = 0; i < 4; i++) {
        if (
          this.blockY[i] === 19 ||
          this.grid[this.blockY[i] + 1][this.blockX[i]] !== -1
        ) {
          break unicorn;
        }
      }
      for (let i = 0; i < 4; i++) {
        this.blockY[i]++;
      }
    }
    for (let i = 0; i < 4; i++) {
      this.grid[this.blockY[i]][this.blockX[i]] = this.id;
    }
  }

  landed() {
    for (let i = 0; i < 4; i++) {
      if (
        this.blockY[i] >= 19 ||
        this.grid[this.blockY[i] + 1][this.blockX[i]] !== -1
      ) {
        for (let z = 0; z < 4; z++) {
          this.grid[this.blockY[z]][this.blockX[z]] = this.id;
        }
        return true;
      }
    }
    return false;
  }

  checkLose() {
    return this.grid[0][4] !== -1 && this.grid[0][5] !== -1;
  }

  newBlock(id) {
    this.id = id;
    switch (id) {
      case 0:
        this.blockX = [4, 3, 5, 6];
        this.blockY = [0, 0, 0, 0];
        break;
      case 1:
        this.blockX = [4, 4, 5, 5];
        this.blockY = [0, 1, 0, 1];
        break;
      case 2:
        this.blockX = [5, 4, 5, 6];
        this.blockY = [1, 1, 0, 0];
        break;
      case 3:
        this.blockX = [5, 4, 5, 6];
        this.blockY = [0, 0, 1, 1];
        break;
      case 4:
        this.blockX = [5, 4, 5, 6];
        this.blockY = [1, 1, 0, 1];
        break;
      case 5:
        this.blockX = [6, 4, 5, 6];
        this.blockY = [1, 1, 1, 0];
        break;
      case 6:
        this.blockX = [4, 4, 5, 6];
        this.blockY = [1, 0, 1, 1];
        break;
      default:
        break;
    }
  }
}
