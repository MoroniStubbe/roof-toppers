class Lava {
    constructor(scene) {
        this.scene = scene;
        this.gameOver = false;
        this.lavaRiseSpeed = 0.5;
        this.createLava();
    }

    createLava() {
        const gameWidth = this.scene.game.config.width * 2;

        const lavaHeight = -1080;
        const lavaYPosition = this.scene.game.config.height;
        
        this.lava = this.scene.add.sprite(
            -500, 
            lavaYPosition, 
            'lava_animation',  
            'Lava_0'
        ).setOrigin(0, 0.96).setDisplaySize(gameWidth, lavaHeight);
        
        // Enable physics
        this.scene.physics.add.existing(this.lava);
        this.lava.body.setImmovable(true);
        this.lava.body.setAllowGravity(false);
    
        // Create animation
        this.scene.anims.create({
            key: 'lavaPlay',
            frames: this.scene.anims.generateFrameNames('lava_animation', {
                start: 0,
                end: 27,
                prefix: 'Lava_',
            }),
            frameRate: 10,
            repeat: -1
        });
    
        // Play the animation
        this.lava.play('lavaPlay');
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
        this.scene.player.stopMovement(); // Call the new function to stop movement
        this.scene.camera.stopFollow();

        // Create the "Game Over" screen
        this.createGameOverScreen();
    }

    createGameOverScreen() {
        const width = this.scene.game.config.width / 2;
        const height = this.scene.game.config.height / 2;

        // Dark transparent overlay
        const overlay = this.scene.add.rectangle(
            width,
            height,
            this.scene.game.config.width,
            this.scene.game.config.height,
            0x000000,
            0.7
        ).setScrollFactor(0);

        const textStyle = {
            fontSize: '30px',
            fill: '#00ff00',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
    }

        // "Game Over" text
        const gameOverText = this.scene.add.text(
            width,
            height - 50,
            'Game Over',
            {
                fontSize: '40px',
                fill: '#ffffff',
                fontStyle: 'bold',
                stroke: '#000000',
                strokeThickness: 4
            }
        ).setOrigin(0.5).setScrollFactor(0);

        // Retry button
        const retryButton = this.scene.add.text(
            width,
            height + 50,
            'Retry',
            textStyle
        ).setOrigin(0.5).setScrollFactor(0).setInteractive();

        // Retry button click event
        retryButton.on('pointerdown', () => {
            this.scene.restartGame();
        });

        const returnHomeButton = this.scene.add.text(
            width,
            height + 150,
            'Return Home',
            textStyle
        ).setOrigin(0.5).setScrollFactor(0).setInteractive();

        returnHomeButton.on('pointerdown', () => {
            this.scene.scene.start('StartScreen');
        });

    }
}
