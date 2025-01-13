class GameFinished extends Phaser.Scene {
    constructor() {
        super({ key: 'GameFinished' });
    }

    init(data) {
        // Receive the score from the previous scene
        this.score = data.score || 0;
    }

    create() {
        // Set background color
        this.cameras.main.setBackgroundColor('#000');

        // Display "You made it!" message
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 50, 'You made it!', {
            fontSize: '32px',
            color: '#fff',
        }).setOrigin(0.5);

        // Display the player's score
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, `Your score is: ${this.score}`, {
            fontSize: '24px',
            color: '#fff',
        }).setOrigin(0.5);

        // Add a button to restart the game or go back to the main menu
        const restartButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 100, 'Continue', {
            fontSize: '24px',
            color: '#0f0',
            backgroundColor: '#222',
            padding: { x: 10, y: 5 },
        }).setOrigin(0.5).setInteractive();

        restartButton.on('pointerdown', () => {
            this.scene.start('StartScreen'); // Replace 'GameScene' with the key of your main game scene
        });
    }
}
