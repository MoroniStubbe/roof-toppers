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
