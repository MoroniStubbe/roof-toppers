class RoofToppers extends Phaser.Scene {
    constructor() {
        super({ key: 'RoofToppers' });
    }

    preload() {
        const URL = window.location.href;

        // Load background, platform, player sprite, and lava texture
        this.load.image('background_image', URL + 'img/gordon.jpg');
        this.load.image('floor_image', URL + 'img/gray.jpg');
        this.load.image('platform_image', URL + 'img/Platform.png');
        this.load.image('wall_image', URL + 'img/wall_object.png');
        this.load.image('big_wall_image', URL + 'img/Big_wall.png');
        this.load.image('finish_image', URL + 'img/finish.png');
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
        return (this.time.now - this.startTime) / 1000; // In seconden
    }

    create() {
        // Create background
        const BACKGROUND = this.add.image(0, 0, 'background_image');
        BACKGROUND.setOrigin(0, 0);
        BACKGROUND.setDisplaySize(this.game.config.width, this.game.config.height);

        this.create_platforms();
        this.platforms.add(new GroundFloor(this, GROUNDFLOOR_CONFIG.x, GROUNDFLOOR_CONFIG.y));
        this.create_walls();
        this.create_bigwalls();
        this.finish = new Finish(this, 200, 200);

        this.player = new Character(this, 100, 1000, 'player', 64, 64);

        this.camera = new CustomCamera(this);

        this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height, true, true, false, true);

        // Add collision between the player and platforms
        this.physics.add.collider(this.player.sprite, this.platforms);
        this.physics.add.collider(this.player.sprite, this.walls);
        this.physics.add.collider(this.player.sprite, this.bigwalls);
        this.physics.add.collider(this.player.sprite, this.finish, (player, platform) => {
            this.finish.handleFinish(player, platform, this);
        });

        // Add timer text
        this.timerText = this.add.text(10, 10, 'Time: 0', {
            fontSize: '20px',
            fill: '#ffffff'
        }).setScrollFactor(0); // Keep text fixed on the screen

        // Initialize the Lava object
        if (this.gamemode === "lava") {
            this.lava = new Lava(this);
        }
    }

    update() {
        if (this.gamemode === "lava" && this.lava.gameOver) {
            return;
        }

        // Update player and camera
        this.player.update();
        this.camera.update();

        let elapsedTime = this.getElapsedTime();
        let minutes = Math.floor(elapsedTime / 60);
        let seconds = Math.floor(elapsedTime % 60);
        let milliseconds = Math.floor((elapsedTime - Math.floor(elapsedTime)) * 1000);

        let formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;

        this.timerText.setText('Time: ' + formattedTime);

        // Update lava
        if (this.gamemode === "lava") {
            this.lava.update();
        }
    }

    // Restart the game by reloading the current scene
    restartGame() {
        this.scene.restart(); // This will restart the current scene
    }
}