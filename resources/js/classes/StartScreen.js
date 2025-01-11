class StartScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScreen' });
    }

    preload() {
        this.load.image('background', 'img/yafrietsky.png');
    }

    create() {
        const BACKGROUND = this.add.image(0, 0, 'background');
        BACKGROUND.setOrigin(0, 0);
        BACKGROUND.setDisplaySize(this.game.config.width, this.game.config.height);

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
        if (this.scene.get('RoofToppers')) {
            this.scene.remove('RoofToppers');
        }

        this.scene.add('RoofToppers', RoofToppers);
        this.scene.start('RoofToppers');
    }

    showScoreboard() {
        window.location.href = "../public/scoreboard";
    }

    exitGame() {
        window.location.href = "../public/";
    }
}