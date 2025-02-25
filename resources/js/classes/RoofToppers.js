class RoofToppers extends Phaser.Scene {
    constructor() {
        super({ key: 'RoofToppers' });
    }

    preload() {
        // Load background, platform, player sprite, and lava texture
        this.load.image('background_image', 'img/Rooftoppers_dungeon.png');
        this.load.image('floor_image', 'img/objects/Dungeon_Floor.png');
        this.load.image('platform_image', 'img/objects/Platform.png');
        this.load.image('cloud_image', 'img/objects/cloud.png');
        this.load.image('cube_image', 'img/objects/CubeTile.png');
        this.load.image('wall_image', 'img/objects/wall.png');
        this.load.spritesheet('glow_wall_image', 'img/objects/Glow_wall.png', { frameWidth: 50, frameHeight: 150 });
        this.load.image('finish_image', 'img/objects/finish.png');
        this.load.atlasXML('lava_animation', 'img/objects/lava.png', 'img/objects/lava.xml');
        this.load.spritesheet('player', 'img/princess.png', { frameWidth: 24, frameHeight: 35 });
    }

    init(gamemode) {
        this.gamemode = gamemode;
        this.startTime = this.time.now;
    }

    // Create objects    
    create_platforms() {
        this.platforms = this.physics.add.staticGroup();

        PLATFORMS_CONFIG.forEach(platform_data => {
            const platform = this.add.existing(
                new Platform(this, platform_data.x, platform_data.y)
            );
            this.platforms.add(platform);
        });
    }

    create_clouds() {
        this.clouds = this.physics.add.group({ allowGravity: false, immovable: true });

        CLOUDS_CONFIG.forEach(cloud_data => {
            const cloud = new Cloud(this, cloud_data.x, cloud_data.y, this.player.sprite);
            this.clouds.add(cloud);
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

    create_invisible_walls() {
        this.invisibleWalls = this.physics.add.staticGroup();
    
        INVISIBLE_WALLS_CONFIG.forEach(wall_data => {
            const invisibleWall = this.add.rectangle(
                wall_data.x,
                wall_data.y,
                wall_data.width,
                wall_data.height,
                0x000000,
                0);

            this.physics.add.existing(invisibleWall, true);
            this.invisibleWalls.add(invisibleWall);
        });
    
        this.physics.add.collider(this.player.sprite, this.invisibleWalls);
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
        const BACKGROUND = this.add.image(
            0,
            this.game.config.height,
            'background_image'
        );
        const scale = this.game.config.width / BACKGROUND.width;
        BACKGROUND.setOrigin(0, 1);
        BACKGROUND.setScale(scale);

        this.player = new Character(
            this,
            100,
            969,
            'player',
            64,
            64
        );

        this.camera = new CustomCamera(this);
        this.camera.camera.setBounds(0,
            -2750,
            this.game.config.width,
            this.game.config.height + 2750);

        this.physics.world.setBounds(
            0,
            0,
            this.game.config.width,
            this.game.config.height,
            true, true, false, true
        );

        // idetify object methods
        this.create_platforms();
        this.create_clouds();
        this.create_cubes();
        this.create_walls();
        this.create_bigwalls();
        this.create_invisible_walls();
        this.floor = new GroundFloor(this, 0, 1024);
        this.finish = new Finish(this, this.game.config.width / 2.5, -2550);

        // Adds collision between the player and objects
        [
            this.platforms,
            this.clouds,
            this.cubes,
            this.walls,
            this.bigwalls,
            this.floor
        ].forEach(group => {
            this.physics.add.collider(this.player.sprite, group);
        });
        
        this.physics.add.collider(
            this.player.sprite,
            this.finish,
            (player, platform) => {
            this.finish.handleFinish(player, platform, this);
        });
        this.physics.add.collider(this.player.sprite,
            this.clouds,
            (player, cloud) => {
            cloud.handlePlayerOnPlatform(player);
        });

        const textStyle = {
            fontSize: '20px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }

        // Add timer
        this.timerText = this.add.text(
            10, 10,
            'Time: 0:00.000',
            textStyle
        ).setScrollFactor(0); // Keep text fixed on the screen

        // Add height meter text
        const heightTextX = this.game.config.width - 140;
        this.heightText = this.add.text(
            heightTextX, 10,
            'Height: 0m',
            textStyle
        ).setScrollFactor(0);

        // Initialize the Lava object
        if (this.gamemode === "lava") {
            this.lava = new Lava(this);
        }

        // Save the starting position of the player
        this.startY = this.player.sprite.y;
    }

    // Restart the game by reloading the current scene
    restartGame() {
        this.scene.restart();
    }

    update() {

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