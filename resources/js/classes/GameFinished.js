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

    }
}
