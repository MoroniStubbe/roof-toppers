class Finish extends Phaser.GameObjects.TileSprite {
    constructor(scene, x, y) {
        super(scene, x, y, 50, 50, 'finish_image');
        scene.add.existing(this);
        this.setOrigin(0, 0);
        const TILE_SCALE = 0.07;
        this.setTileScale(TILE_SCALE, TILE_SCALE);
        scene.physics.add.existing(this, true);
    }

    // Handle the finish platform logic
    handleFinish(player, platform, scene) {
        if (player.body && platform.body && player.body.touching.down) { // Check if the player is landing on the finish
            scene.scene.start('StartScreen');
        }
    }
}