class RoofToppers extends Phaser.Scene {
    constructor() {
        super({ key: 'RoofToppers' });
    }

    preload() {
        const URL = window.location.href;

        // Load background, platform, player sprite, and lava texture
        this.load.image('background_image', URL + 'img/gordon.jpg');
        this.load.image('floor_image', URL + 'img/gray.jpg');
        this.load.image('platform_image', URL + 'img/gj.jpg');
        this.load.image('wall_image', URL + 'img/jeff.jpg');
        this.load.image('finish_image', URL + 'img/yafrietsky.png');
        this.load.spritesheet('player', URL + 'img/princess.png', { frameWidth: 24, frameHeight: 35 });
        this.load.image('lava_image', URL + 'img/lava.jpg');
    }

    init() {
        this.startTime = this.time.now;
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

    create_walls() {
        this.walls = this.physics.add.staticGroup();

        WALLS_CONFIG.forEach(wall_data => {
            const wall = this.add.existing(
                new Wall(this, wall_data.x, wall_data.y)
            );
            this.walls.add(wall);
        });
    }

    getElapsedTime() {
        return Math.floor((this.time.now - this.startTime) / 1000);
    }

    create() {
        // Create background
        const BACKGROUND = this.add.image(0, 0, 'background_image');
        BACKGROUND.setOrigin(0, 0);
        BACKGROUND.setDisplaySize(this.game.config.width, this.game.config.height);

        this.create_platforms();
        this.platforms.add(new GroundFloor(this, GROUNDFLOOR_CONFIG.x, GROUNDFLOOR_CONFIG.y));
        this.create_walls();
        this.finish = new Finish(this, 200, 200);

        this.player = new Character(this, 100, 1000, 'player', 64, 64);

        this.camera = new CustomCamera(this);

        this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height, true, true, false, true);

        // Add collision between the player and platforms
        this.physics.add.collider(this.player.sprite, this.platforms);
        this.physics.add.collider(this.player.sprite, this.ground_floor);
        this.physics.add.collider(this.player.sprite, this.walls);
        this.physics.add.collider(this.player.sprite, this.finish, (player, platform) => {
            this.finish.handleFinish(player, platform, this);
        });

        // Add timer text
        this.timerText = this.add.text(10, 10, 'Time: 0', {
            fontSize: '20px',
            fill: '#ffffff'
        }).setScrollFactor(0); // Keep text fixed on the screen

        // Add Lava
        this.lava = this.add.rectangle(0, this.game.config.height, this.game.config.width, -9999, 0xff4500).setOrigin(0, 1);
        this.physics.add.existing(this.lava);
        this.lava.body.setImmovable(true);
        this.lava.body.setAllowGravity(false);

        // Add collision detection between player and lava
        this.physics.add.overlap(this.player.sprite, this.lava, this.handleLavaCollision, null, this);

        this.lavaRiseSpeed = 0.5; // Lava rise speed (pixels per frame)
        this.gameOver = false;
    }

    update() {
        if (this.gameOver) {
            return;
        }

        // Update player and camera
        this.player.update();
        this.camera.update();
        this.timerText.setText('Time: ' + this.getElapsedTime());

        // Slowly rise the lava
        this.lava.y -= this.lavaRiseSpeed;

        // Check if player is below lava level
        if (this.player.sprite.y > this.lava.y) {
            this.handleLavaCollision();
        }
    }

    handleLavaCollision() {
        // Handle player death when touching lava
        this.gameOver = true;
        this.player.sprite.setTint(0xff0000); // Turn the player red
        this.player.sprite.setVelocity(0, 0); // Stop the player
        this.add.text(this.game.config.width / 2 - 100, this.game.config.height / 2, 'Game Over', {
            fontSize: '40px',
            fill: '#ffffff',
        }).setOrigin(0.5);
    }
}
