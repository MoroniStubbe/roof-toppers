class RoofToppers extends Phaser.Scene {
    constructor() {
        super({ key: 'RoofToppers' });
    }

    preload() {
        const URL = window.location.href;

        // Load background, platform, and player sprite
        this.load.image('background_image', URL + 'img/gordon.jpg');
        this.load.image('platform_image', URL + 'img/gj.jpg');
        this.load.image('finish_image', URL + 'img/gj.jpg');
        this.load.spritesheet('player', URL + 'img/princess.png', { frameWidth: 24, frameHeight: 35 });
    }

    create_platforms() {
        this.platforms = this.physics.add.staticGroup();

        PLATFORMS_CONFIG.forEach(platform_data => {
            const platform = this.add.existing(
                new Platform(this, platform_data.x, platform_data.y)
            );
            this.platforms.add(platform);
        });
    }

    create() {
        // Create background
        const BACKGROUND = this.add.image(0, 0, 'background_image');
        BACKGROUND.setOrigin(0, 0);
        BACKGROUND.setDisplaySize(this.game.config.width, this.game.config.height);

        this.create_platforms();
        this.finish = new Finish(this, 200, 200);
        this.player = new Character(this, 100, 400, 'player', 64, 64);

        // Add collision between the player and platforms
        this.physics.add.collider(this.player.sprite, this.platforms);
        this.physics.add.collider(this.player.sprite, this.finish, this.finish.handleFinish, null, this.finish);

        // Add finish event listener
        this.events.on('levelFinished', () => {
            console.log('Player has completed the level!');
            // Add logic for transitioning to the next level or displaying a completion message
            this.scene.start('RoofToppers'); // Example: Transition to the next scene
        });
    }

    update() {
        // Update player character
        this.player.update();
    }
}
