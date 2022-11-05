const GRID_WIDTH = 600;
const GRID_HEIGHT = GRID_WIDTH*2;
const CELL_SIZE = GRID_WIDTH/20;

var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
}

function create ()
{
    let grid = this.add.grid(0, 0, GRID_WIDTH, GRID_HEIGHT
                , CELL_SIZE, CELL_SIZE, 0xffffff);
}

function update ()
{
}
