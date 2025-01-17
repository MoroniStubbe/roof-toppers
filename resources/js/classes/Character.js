class Character {
    constructor(scene, x, y, key, frameWidth = 24, frameHeight = 35) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, key).setOrigin(0.5, 0.5);
        this.sprite.setScale(3);
        this.sprite.setBounce(0.2);
        this.sprite.setCollideWorldBounds(true);

        this.createAnimations(key, frameWidth, frameHeight);

        // Movement keys
        this.keys = scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        this.gameOver = false; // Flag to check if the player is dead
    }

    createAnimations(key, frameWidth, frameHeight) {
        const animations = [
            { key: 'left', frame: 1 },
            { key: 'right', frame: 0 },
            { key: 'jumpLeft', frame: 2 },
            { key: 'jumpRight', frame: 3 }
        ];

        animations.forEach(anim => {
            if (!this.sprite.anims.exists(anim.key)) {
                this.sprite.anims.create({
                    key: anim.key,
                    frames: [{ key: key, frame: anim.frame }],
                    frameRate: 1,
                    repeat: -1
                });
            }
        });
    }

    update() {
        // Stop movement if the game is over
        if (this.gameOver) {
            this.sprite.setVelocity(0, 0);
            return;
        }

        // Horizontal movement
        if (this.keys.left.isDown) {
            this.sprite.setVelocityX(-400); // Move left
            this.sprite.anims.play('left', true);
        } else if (this.keys.right.isDown) {
            this.sprite.setVelocityX(400); // Move right
            this.sprite.anims.play('right', true);
        } else {
            this.sprite.setVelocityX(0);
        }

        // Jumping
        if (this.keys.jump.isDown && this.sprite.body.blocked.down) {
            this.sprite.setVelocityY(-1000);
        }

        // Maintain jump animation in the air
        if (!this.sprite.body.blocked.down) {
            if (this.keys.left.isDown) {
                this.sprite.anims.play('jumpLeft', true);
            } else if (this.keys.right.isDown) {
                this.sprite.anims.play('jumpRight', true);
            }
        }
    }

    stopMovement() {
        this.gameOver = true;
        this.sprite.setVelocity(0, 0);
        this.sprite.anims.stop();
    }
}
