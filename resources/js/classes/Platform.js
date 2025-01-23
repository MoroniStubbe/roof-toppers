class Platform extends Phaser.GameObjects.TileSprite {
    constructor(scene, x, y) {
        super(scene, x, y, 174, 50, 'platform_image');
        scene.add.existing(this);
        this.setOrigin(0, 0);
        const TILE_SCALE = 1;
        this.setTileScale(TILE_SCALE, TILE_SCALE);
        scene.physics.add.existing(this, true);
    }
}

class CubeTile extends Phaser.GameObjects.TileSprite {
    constructor(scene, x, y) {
        super(scene, x, y, 50, 50, 'cube_image');
        scene.add.existing(this);
        this.setOrigin(0, 0);
        const TILE_SCALE = 1;
        this.setTileScale(TILE_SCALE, TILE_SCALE);
        scene.physics.add.existing(this, true);
    }
}

class Cloud extends Phaser.GameObjects.TileSprite {
    constructor(scene, x, y, player) { // Accept player as a parameter
        super(scene, x, y, 174, 50, 'platform_image');

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
        if (!this.isDisappearing) {
            this.isDisappearing = true;
    
            // Fade out over 500ms
            this.scene.tweens.add({
                targets: this,
                alpha: 0,
                duration: 250, // 0.5 seconds fade-out
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

