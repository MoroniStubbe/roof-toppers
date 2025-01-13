class Lava {
    constructor(scene) {
        this.scene = scene;
        this.gameOver = false;
        this.lavaRiseSpeed = 0.5;
        this.createLava();
    }

    createLava() {
        // Create the lava rectangle
        this.lava = this.scene.add.tileSprite(
            0, 
            this.scene.game.config.height, 
            this.scene.game.config.width, 
            -9999, 
            'lava_image'
        ).setOrigin(0, 1);

        // Make the lava immovable and disable gravity
        this.scene.physics.add.existing(this.lava);
        this.lava.body.setImmovable(true);
        this.lava.body.setAllowGravity(false);
    }

    update() {
        if (this.gameOver) return;

        // Slowly rise the lava
        this.lava.y -= this.lavaRiseSpeed;

        // Check if player is below lava level
        if (this.scene.player.sprite.y > this.lava.y) {
            this.handleLavaCollision();
        }
    }

    handleLavaCollision() {
        // Handle player death when touching lava
        this.gameOver = true;

        // Tint player red and stop movement
        this.scene.player.sprite.setTint(0xff0000); 
        this.scene.player.sprite.setVelocity(0, 0);

        // Create the "Game Over" screen
        this.createGameOverScreen();
    }

    createGameOverScreen() {
        // Dark transparent overlay
        const overlay = this.scene.add.rectangle(
            this.scene.game.config.width / 2, 
            this.scene.game.config.height / 2, 
            this.scene.game.config.width, 
            this.scene.game.config.height, 
            0x000000, 
            0.7 
        ).setScrollFactor(0);

        // "Game Over" text
        const gameOverText = this.scene.add.text(
            this.scene.game.config.width / 2, 
            this.scene.game.config.height / 2 - 50, 
            'Game Over', 
            {
                fontSize: '40px',
                fill: '#ffffff',
                fontStyle: 'bold',
            }
        ).setOrigin(0.5);

        // Retry button
        const retryButton = this.scene.add.text(
            this.scene.game.config.width / 2, 
            this.scene.game.config.height / 2 + 50, 
            'Retry', 
            {
                fontSize: '30px',
                fill: '#00ff00',
                fontStyle: 'bold',
            }
        ).setOrigin(0.5).setInteractive();

        // Retry button click event
        retryButton.on('pointerdown', () => {
            this.scene.restartGame();
        });
    }

    stopLava() {
        this.lavaRiseSpeed = 0;  // Stop the lava from rising
    }
}
