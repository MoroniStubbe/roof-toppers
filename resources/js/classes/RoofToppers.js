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
            new Platform(this, platform_data.x, platform_data.y);
        });
    }

    create() {
        const BACKGROUND = this.add.image(0, 0, 'background_image');
        BACKGROUND.setOrigin(0, 0);  // Set the origin to the top-left corner
        BACKGROUND.setDisplaySize(this.game.config.width, this.game.config.height);
        this.create_platforms();
    }

    update() {
    }
}