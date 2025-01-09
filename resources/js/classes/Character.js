class Character {
    constructor(scene, x, y, key, frameWidth = 24, frameHeight = 35) {

        this.sprite = scene.physics.add.sprite(x, y, key).setOrigin(0.5, 0.5);

        this.sprite.setBounce(0.2);
        this.sprite.setCollideWorldBounds(true);

        this.createAnimations(scene, key, frameWidth, frameHeight);

        // movement keys
        this.keys = scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
    }

    createAnimations(scene, key, frameWidth, frameHeight) {
        const animations = [
            { key: 'left', frame: 1 },
            { key: 'right', frame: 0 },
            { key: 'jumpLeft', frame: 2 },
            { key: 'jumpRight', frame: 3 }
        ];

        animations.forEach(anim => {
            scene.anims.create({
                key: anim.key,
                frames: [{ key: key, frame: anim.frame }],
                frameRate: 1,
                repeat: -1
            });
        });
    }

    update() {
        // Horizontal movement
        if (this.keys.left.isDown) {
            this.sprite.setVelocityX(-160); // Move left
            this.sprite.anims.play('left', true); // Play the 'left' animation
        } else if (this.keys.right.isDown) {
            this.sprite.setVelocityX(160); // Move right
            this.sprite.anims.play('right', true); // Play the 'right' animation
        } else {
            this.sprite.setVelocityX(0); // Stop horizontal movement
        }

        // Jumping
        if (this.keys.jump.isDown && this.sprite.body.blocked.down) {
            this.sprite.setVelocityY(-330); // Jump upward
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
}