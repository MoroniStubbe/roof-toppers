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
        return (this.time.now - this.startTime) / 1000; // Time shown in seconds
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

        if (this.gamemode === "lava" && this.lava.gameOver) {
            return;
        }

        // Calculate elapsed time in minutes, seconds, and milliseconds
        let elapsedTime = this.getElapsedTime();
        let minutes = Math.floor(elapsedTime / 60);
        let seconds = Math.floor(elapsedTime % 60);
        let milliseconds = Math.floor((elapsedTime - Math.floor(elapsedTime)) * 1000);
        let formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;

        // Update timer
        this.timerText.setText('Time: ' + formattedTime);

        // Update lava
        if (this.gamemode === "lava") {
            this.lava.update();

        }



        // Calculate the height of the player in meters
        const pixelsPerMeter = 70;  // 1.50 meters = 105 pixels => 105 / 1.50 = 70 pixels per meter
        let heightInMeters = Math.floor((this.game.config.height - this.player.sprite.y) / pixelsPerMeter);
        this.heightText.setText('Height: ' + heightInMeters + 'm');
    }
}