// Game configuration
const CONFIG = {
    type: Phaser.AUTO,
    width: 1080,
    height: 1080,
    scene: RoofToppers,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
};

// Create the game instance
const GAME = new Phaser.Game(CONFIG);