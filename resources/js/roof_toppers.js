// Game configuration
const CONFIG = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight - 1, //offset by 1 to remove scroll
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