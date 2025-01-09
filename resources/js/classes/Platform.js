class Platform extends Phaser.GameObjects.TileSprite {
    constructor(scene, x, y) {
        super(scene, x, y, 200, 50, 'platform_image');
        scene.add.existing(this);
        this.setOrigin(0, 0);
        const TILE_SCALE = 0.07;
        this.setTileScale(TILE_SCALE, TILE_SCALE);
        scene.physics.add.existing(this, true);
    }
}