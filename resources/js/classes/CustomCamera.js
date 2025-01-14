class CustomCamera {
    constructor(scene) {
        this.scene = scene;
        this.camera = scene.cameras.main;
        this.cameraSpeed = 500;
        this.floor = 1;
        this.cameraMoving = false;
        this.camera.y_value = 0;
    }

    getFloor() {
        return Math.floor(this.scene.player.sprite.y / 540);
    }

    onFloorChange(floor) {
        this.cameraMoving = true;

        if (floor === 1) {
            this.camera.pan(this.camera.centerX, 540, this.cameraSpeed, 'Linear', false, () => this.onPanComplete(floor));
        }
        else {
            this.moveToFloor(floor);
        }
    }

    onPanComplete(floor) {
        this.floor = floor;
        this.cameraMoving = false;
        if (floor !== 1) {
            this.camera.y_value = this.scene.game.config.height / 2 + 540 * floor - 940;
        }
    }

    moveToFloor(floor) {
        this.camera.pan(this.camera.centerX, this.scene.game.config.height / 2 + 540 * floor - 400, this.cameraSpeed, 'Linear', false, () => this.onPanComplete(floor));
    }

    update() {
        if (!this.cameraMoving && this.scene.player.sprite.body.blocked.down) {
            const floor = this.getFloor();

            if (floor !== this.floor) {
                this.onFloorChange(floor);
            }
        }
    }
}