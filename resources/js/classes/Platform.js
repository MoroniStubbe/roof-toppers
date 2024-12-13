class Platform {
    constructor(scene, x, y, width, height, key) {
        const PLATFORM = scene.add.tileSprite(x, y, width, height, key).setOrigin(0, 0);
        const TILE_SCALE = 0.1;
        PLATFORM.setTileScale(TILE_SCALE, TILE_SCALE);
        scene.physics.add.existing(PLATFORM, true);
    }
}