// Game configuration
const CONFIG = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    scene: RoofToppers,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
};

// Create the game instance
const GAME = new Phaser.Game(CONFIG);