class RoofToppers extends Phaser.Scene {
    constructor() {
        super({ key: 'RoofToppers' });
    }

    preload() {

    create_platforms() {
        this.platforms = this.physics.add.staticGroup();

        PLATFORMS_CONFIG.forEach(platform_data => {
            new Platform(this, platform_data.x, platform_data.y, platform_data.width, platform_data.height, platform_data.key);
        });
    }

    create() {
    }

    update() {
    }
}