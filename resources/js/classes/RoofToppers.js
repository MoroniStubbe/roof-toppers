class RoofToppers extends Phaser.Scene {
    constructor() {
        super({ key: 'RoofToppers' });
    }

    preload() {
        const URL = window.location.href;
        this.load.image('background_image', URL + 'img/gordon.jpg');
        this.load.image('platform_image', URL + 'img/gj.jpg');
    }

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