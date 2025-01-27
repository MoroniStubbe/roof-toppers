class Cloud extends Phaser.GameObjects.TileSprite {
    constructor(scene, x, y, player) { // Accept player as a parameter
        super(scene, x, y, 175, 50, 'cloud_image');

        scene.add.existing(this);
        this.setOrigin(0, 0);
        this.setTileScale(1, 1);

        // Use a dynamic physics body
        scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.body.allowGravity = false;

        this.isDisappearing = false;
        this.player = player; // Store reference to the player

        // Ensure player exists before adding collider
        if (this.player) {
            scene.physics.add.collider(this.player, this, this.handlePlayerOnPlatform, null, this);
        } else {
            console.warn("Warning: player is undefined in Cloud.");
        }
    }

    handlePlayerOnPlatform(player) {
        // Ensure the player is standing ON the cloud (not jumping through it)
        if (player.body.touching.down && !this.isDisappearing) {
            this.isDisappearing = true;
    
            // Fade out over 500ms
            this.scene.tweens.add({
                targets: this,
                alpha: 0,
                duration: 250,
                onComplete: () => {
                    this.setVisible(false);
                    this.body.enable = false; 
    
                    // Wait 1 second before reappearing
                    this.scene.time.delayedCall(1000, () => {
                        this.setVisible(true);
                        
                        // Fade in over 500ms
                        this.scene.tweens.add({
                            targets: this,
                            alpha: 1,
                            duration: 500, // 0.5 seconds fade-in
                            onComplete: () => {
                                this.body.enable = true;
                                this.isDisappearing = false;
                            }
                        });
                    });
                }
            });
        }
    }
}
