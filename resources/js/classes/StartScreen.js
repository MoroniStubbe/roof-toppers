class StartScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScreen' });
    }

    preload() {
        this.load.image('background', 'img/memes/yafrietsky.png');
    }

    create() {
        const BACKGROUND = this.add.image(0, 0, 'background');
        BACKGROUND.setOrigin(0, 0);
        BACKGROUND.setDisplaySize(this.game.config.width, this.game.config.height);

        // Create Start button
        const startButton = this.add.text(300, 150, 'Start Game', { font: '32px Arial', fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', this.startGame, this);

        // Create Scoreboard button
        const scoreboardButton = this.add.text(300, 250, 'Scoreboard', { font: '32px Arial', fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', this.showScoreboard, this);

        // Create Exit button
        const exitButton = this.add.text(300, 350, 'Exit', { font: '32px Arial', fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', this.exitGame, this);

        // Create Normal Mode button
        this.normalModeButton = this.add.text(300, 450, 'Normal Mode', { font: '32px Arial', fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', () => this.selectMode('normal'), this);

        // Create Lava Mode button
        this.lavaModeButton = this.add.text(300, 550, 'Lava Mode', { font: '32px Arial', fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', () => this.selectMode('lava'), this);

        // Store the initial state (no mode selected)
        this.selectedMode = "normal";
        this.selectMode(this.selectedMode);
    }

    selectMode(mode) {
        this.selectedMode = mode; // Keep track of the selected mode

        // Set the selected mode text color to green
        if (mode === 'normal') {
            this.normalModeButton.setFill('#00FF00'); // Green for Normal Mode
            this.lavaModeButton.setFill('#ffffff'); // Reset Lava Mode text color
        } else if (mode === 'lava') {
            this.lavaModeButton.setFill('#00FF00'); // Green for Lava Mode
            this.normalModeButton.setFill('#ffffff'); // Reset Normal Mode text color
        }
    }

    startGame() {
        // Add and start the RoofToppers scene
        if (this.scene.get('RoofToppers')) {
            this.scene.remove('RoofToppers');
        }

        this.scene.add('RoofToppers', RoofToppers);
        this.scene.start('RoofToppers', this.selectedMode);
    }

    showScoreboard() {
        window.location.href = "../public/scores";
    }

    exitGame() {
        window.location.href = "../public/";
    }
}
