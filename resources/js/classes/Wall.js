class Wall extends Phaser.GameObjects.TileSprite {
    constructor(scene, x, y) {
        super(scene, x, y, 25, 100, 'wall_image');
        scene.add.existing(this);
        this.setOrigin(0, 0);
        const TILE_SCALE = 1;
        this.setTileScale(TILE_SCALE, TILE_SCALE);
        scene.physics.add.existing(this, true);
    }
}

class BigWall extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'glow_wall_image');
        scene.add.existing(this);
        this.setOrigin(0, 0);
        scene.physics.add.existing(this, true);

        // Ensure animation exists before playing
        if (!scene.anims.exists('big_wall_anim')) {
            this.createAnimations(scene);
        }
        
        this.play('glow_wall_anim'); // Play after ensuring animation exists
    }

    createAnimations(scene) {
        scene.anims.create({
            key: 'glow_wall_anim',
            frames: scene.anims.generateFrameNumbers('glow_wall_image', { start: 0, end: 10 }),
            frameRate: 10,
            repeat: -1
        });
    }
}
