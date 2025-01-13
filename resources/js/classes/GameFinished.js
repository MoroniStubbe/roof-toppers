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

    }
}
