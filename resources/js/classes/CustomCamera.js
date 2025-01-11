class CustomCamera {
    constructor(scene) {
        this.scene = scene;
        this.camera = scene.cameras.main;
        this.cameraSpeed = 2000;
    }

    // Move the camera up
    moveUp() {
        this.camera.once('camerapancomplete', this.onPanComplete, this);
        this.camera.pan(this.camera.centerX, this.floor * -1080 - 1080, this.cameraSpeed);
    }

    // Move the camera down
    moveDown() {
        this.camera.pan(this.camera.centerX, this.floor, this.cameraSpeed);
    }

    // Update method to check the player's position
    update() {
        if (this.scene.player.sprite.y <= 100) {
            this.moveUp();
        } else if (this.scene.player.sprite.y >= 980) {
            this.moveDown();
        }
    }

    // You can listen to camera pan events here, e.g., when pan is complete
    onPanComplete() {
        console.log('Camera pan completed!');
    }
}