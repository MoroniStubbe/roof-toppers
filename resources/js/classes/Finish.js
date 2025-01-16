class Finish extends Phaser.GameObjects.TileSprite {
    constructor(scene, x, y) {
        super(scene, x, y, 200, 50, 'finish_image');
        scene.add.existing(this);
        this.setOrigin(0, 0);
        const TILE_SCALE = 25;
        this.setTileScale(TILE_SCALE, TILE_SCALE);
        scene.physics.add.existing(this, true);
    }

    handleFinish(player, platform, scene) {
        if (player.body && platform.body && player.body.touching.down) { // Check if player lands on the finish
            // Get the elapsed time
            const elapsedTime = scene.getElapsedTime();

            // Send the score to the server via AJAX (using fetch)
            fetch(window.location.origin + '/roof-toppers/public/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content') // Get CSRF token
                },
                body: JSON.stringify({
                    time: elapsedTime
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Score saved:', data);
                    // Optionally, you can show a success message to the player here
                })
                .catch(error => {
                    console.error('Error saving score:', error);
                });

            // After finishing, restart the scene or do something else
            scene.scene.start('GameFinished', { score: elapsedTime });
        }
    }
}