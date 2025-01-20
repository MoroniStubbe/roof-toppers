class RoofToppers extends Phaser.Scene {
    constructor() {
        super({ key: 'RoofToppers' });
    }

    preload() {
        // Load background, platform, and player sprite
        this.load.image('background_image', 'img/gordon.jpg');
        this.load.image('floor_image', 'img/gray.jpg');
        this.load.image('platform_image', 'img/gj.jpg');
        this.load.image('cube_image', 'img/CubeTile.png');
        this.load.image('wall_image', 'img/jeff.jpg');
        this.load.spritesheet('glow_wall_image', 'img/Glow_wall.png', { frameWidth: 50, frameHeight: 150 });
        this.load.spritesheet('big_wall_image', 'img/Big_wall.png', { frameWidth: 50, frameHeight: 150 });
        this.load.image('finish_image', 'img/yafrietsky.png');
        this.load.spritesheet('player', 'img/princess.png', { frameWidth: 24, frameHeight: 35 });
        this.load.image('lava_image', 'img/lava.jpg');
    }

    init(gamemode) {
        this.gamemode = gamemode;
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

    create_cubes() {
        this.cubes = this.physics.add.staticGroup();

        CUBES_CONFIG.forEach(cube_data => {
            const cube = this.add.existing(
                new CubeTile(this, cube_data.x, cube_data.y)
            );
            this.cubes.add(cube);
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

    create_bigwalls() {
        this.bigwalls = this.physics.add.staticGroup();

        BIGWALLS_CONFIG.forEach(bigwall_data => {
            const bigwall = this.add.existing(
                new BigWall(this, bigwall_data.x, bigwall_data.y)
            );
            this.bigwalls.add(bigwall);
        });
    }

    getElapsedTime() {
        return (this.time.now - this.startTime) / 1000; // Time shown in seconds
    }

    getFormattedTime() {
        let elapsedTime = this.getElapsedTime();
        let minutes = Math.floor(elapsedTime / 60);
        let seconds = Math.floor(elapsedTime % 60);
        let milliseconds = Math.floor((elapsedTime - Math.floor(elapsedTime)) * 1000);
        return `${minutes}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
    }

    create() {
        if (!this.scene.get('GameFinished')) {
            this.scene.add('GameFinished', GameFinished);
        }

        // Create background
        const BACKGROUND = this.add.image(0, 0, 'background_image');
        BACKGROUND.setOrigin(0, 0);
        BACKGROUND.setDisplaySize(this.game.config.width, this.game.config.height);

        this.create_platforms();
        this.create_cubes();
        this.platforms.add(new GroundFloor(this, GROUNDFLOOR_CONFIG.x, GROUNDFLOOR_CONFIG.y));
        this.create_walls();
        this.create_bigwalls();
        this.finish = new Finish(this, 750, -200);

        this.player = new Character(this, 100, 969, 'player', 64, 64);

        this.camera = new CustomCamera(this);

        this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height, true, true, false, true);

        // Add collision between the player and platforms
        this.physics.add.collider(this.player.sprite, this.platforms);
        this.physics.add.collider(this.player.sprite, this.cubes);
        this.physics.add.collider(this.player.sprite, this.ground_floor);
        this.physics.add.collider(this.player.sprite, this.walls);
        this.physics.add.collider(this.player.sprite, this.bigwalls);
        this.physics.add.collider(this.player.sprite, this.finish, (player, platform) => {
            this.finish.handleFinish(player, platform, this);
        });

        // Add timer text
        this.timerText = this.add.text(10, 10, 'Time: 0:00.000', {
            fontSize: '20px',
            fill: '#ffffff'
        }).setScrollFactor(0); // Keep text fixed on the screen

        // Initialize the Lava object
        if (this.gamemode === "lava") {
            this.lava = new Lava(this);
        }

        // Add height meter text
        const heightTextX = this.game.config.width - 140;
        this.heightText = this.add.text(heightTextX, 10, 'Height: 0m', {
            fontSize: '20px',
            fill: '#ffffff'
        }).setScrollFactor(0);

        // Save the starting position of the player
        this.startY = this.player.sprite.y;
    }

    // Restart the game by reloading the current scene
    restartGame() {
        this.scene.restart(); // This will restart the current scene
    }

    update() {
        this.player.update();
        this.camera.update();

        if (this.gamemode === "lava" && this.lava?.gameOver) {
            return;
        }

        // Update player and camera
        this.player.update();
        this.camera.update();

        this.timerText.setText('Time: ' + this.getFormattedTime());

        // Update lava
        if (this.gamemode === "lava") {
            this.lava.update();
        }

        // Calculate the height of the player in meters
        const pixelsPerMeter = 110;  // 1.50 meters = 105 pixels => 105 / 1.50 = 70 pixels per meter
        let heightInMeters = Math.floor((this.game.config.height - this.player.sprite.y) / pixelsPerMeter);
        this.heightText.setText('Height: ' + heightInMeters + 'm');
    }
}