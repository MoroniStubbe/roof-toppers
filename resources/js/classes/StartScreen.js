class StartScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScreen' });
    }

    preload() {
        this.load.image('background', 'img/memes/yafrietsky.png');
    }

    create() {
        const BACKGROUND = this.add.image(0, 0, 'background');
        BACKGROUND.setOrigin(0, 0);
        BACKGROUND.setDisplaySize(this.game.config.width, this.game.config.height);

        // Create buttons
        const createButton = (
            scene, x, y,
            text, callback,
            mode = null) => {

            let button = scene.add.text(
                x, y, text,
                { 
                    font: '32px Arial',
                    fill: '#ffffff',
                    stroke: '#000000',
                    strokeThickness: 4
                 })
                .setInteractive()
                .on('pointerdown', () => {
                    if (mode) scene.selectMode(mode);
                    else callback.call(scene);
                })
                .on('pointerover', () => {
                    if (scene.selectedMode !== mode) button.setStyle({ fill: '#00FF00' });
                })
                .on('pointerout', () => {
                    if (scene.selectedMode !== mode) button.setStyle({ fill: '#ffffff' });
                });
        
            return button;
        };
        
        // Buttons locations
        const startButton = createButton(this, 300, 150, 'Start Game', this.startGame);
        const scoreboardButton = createButton(this, 300, 250, 'Scoreboard', this.showScoreboard);
        const exitButton = createButton(this, 300, 350, 'Exit', this.exitGame);
        this.normalModeButton = createButton(this, 300, 450, 'Normal Mode', this.startGame, 'normal');
        this.lavaModeButton = createButton(this, 300, 550, 'Lava Mode', this.startGame, 'lava');
        
        // Store the initial state (no mode selected)
        this.selectedMode = "normal";
        this.selectMode(this.selectedMode);
        
    }

    selectMode(mode) {
        this.selectedMode = mode;
    
        // Set correct color based on selection
        this.normalModeButton.setStyle({ fill: mode === 'normal' ? '#00FF00' : '#ffffff' });
        this.lavaModeButton.setStyle({ fill: mode === 'lava' ? '#FF9900' : '#ffffff' });
    }
    

    startGame() {
        // Add and start the RoofToppers scene
        if (this.scene.get('RoofToppers')) {
            this.scene.remove('RoofToppers');
        }

        this.scene.add('RoofToppers', RoofToppers);
        this.scene.start('RoofToppers', this.selectedMode);
    }

    showScoreboard() {
        window.location.href = "../public/scores";
    }

    exitGame() {
        window.location.href = "../public/";
    }
}
