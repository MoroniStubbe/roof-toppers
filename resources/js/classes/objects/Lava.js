class Lava {
    constructor(scene) {
        this.scene = scene;
        this.gameOver = false;
        this.lavaRiseSpeed = 0.5;
        this.lavaActive = false;
        this.createLava();
        this.createCountdownTimer();
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

    createCountdownTimer() {
        let countdown = 0.95; 
        const centerX = this.scene.game.config.width / 2;
        const centerY = this.scene.game.config.height / 2;

        const textStyle = {
            fontSize: '50px',
            fill: '#ff0000',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 8
        };

        // Create the lava timer
        this.timerText = this.scene.add.text(
            centerX,
            centerY,
            `Lava incoming in: ${countdown.toFixed(3)}`,
            textStyle
        ).setOrigin(0.5).setScrollFactor(0);

        // Update timer every frame to show milliseconds
        this.scene.time.addEvent({
            delay: 10,
            callback: () => {
                countdown -= 0.01; 
                if (countdown <= 0) {
                    this.timerText.destroy();
                    this.lavaActive = true; 
                } else {
                    this.timerText.setText(`Lava incoming in: ${countdown.toFixed(3)}`);
                }
            },
            repeat: countdown * 100 // Runs until 0
        });
    }

    update() {
        if (this.gameOver || !this.lavaActive) return;

        // Slowly rise the lava after the countdown ends
        this.lava.y -= this.lavaRiseSpeed;

        // Check if player is below lava level
        if (this.scene.player.sprite.y > this.lava.y) {
            this.handleLavaCollision();
        }
    }

    handleLavaCollision() {
        this.gameOver = true;
        this.scene.player.sprite.setTint(0xff0000);
        this.scene.player.stopMovement();
        this.scene.camera.stopFollow();
        this.createGameOverScreen();
    }

    createGameOverScreen() {
        const width = this.scene.game.config.width / 2;
        const height = this.scene.game.config.height / 2;

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
        };

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

        const retryButton = this.scene.add.text(
            width,
            height + 50,
            'Retry',
            textStyle
        ).setOrigin(0.5).setScrollFactor(0).setInteractive();

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
