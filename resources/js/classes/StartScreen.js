class StartScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScreen' });
    }

    preload() {

    }

    create() {
        // Create Start button
        const startButton = this.add.text(300, 200, 'Start Game', { font: '32px Arial', fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', this.startGame, this);

        // Create Scoreboard button
        const scoreboardButton = this.add.text(300, 300, 'Scoreboard', { font: '32px Arial', fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', this.showScoreboard, this);

        // Create Exit button
        const exitButton = this.add.text(300, 400, 'Exit', { font: '32px Arial', fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', this.exitGame, this);
    }

    startGame() {
        this.scene.start('RoofToppers');
    }

    showScoreboard() {
        console.log("Scoreboard button clicked");
        // Here you can add your logic to show the scoreboard scene
        // For example: this.scene.start('ScoreboardScene');
    }

    exitGame() {
        console.log("Exit button clicked");
        // Here you can add your logic to exit the game or go to a previous scene
        // For example: this.game.destroy(true);
    }
}