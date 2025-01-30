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
            this.camera.pan(
                this.camera.centerX,
                540,
                this.cameraSpeed,
                'Linear',
                false,
                () => this.onPanComplete(floor)
            );
        } else {
            this.moveToFloor(floor);
        }
    }

    onPanComplete(floor) {
        this.floor = floor;
        this.cameraMoving = false;
    
        let maxCameraY = -2750 + this.scene.game.config.height / 2;
        let newY = this.scene.game.config.height / 2 + 540 * floor - 940;
    
        this.camera.y_value = Math.max(newY, maxCameraY);
    }

    moveToFloor(floor) {
        let heightTarget = this.scene.game.config.height / 2 + 540 * floor - 400;
        let maxCameraY = -2750 + this.scene.game.config.height / 2;
    
        
        heightTarget = Math.max(heightTarget, maxCameraY);
    
        this.camera.pan(
            this.camera.centerX,
            heightTarget,
            this.cameraSpeed,
            'Linear',
            false,
            () => this.onPanComplete(floor)
        );
    }

    update() {
        // Stop camera movement if game is over
        this.gameOver = false;

        if (this.scene.gamemode === "lava" && this.scene.lava?.gameOver) {
            return;
        }

        if (!this.cameraMoving && this.scene.player.sprite.body.blocked.down) {
            const floor = this.getFloor();

            if (floor !== this.floor) {
                this.onFloorChange(floor);
            }
        }
    }

    stopFollow() {
        this.cameraMoving = false;
        this.floor = 1;
        
        this.camera.stopFollow(); 
    
        this.camera.setScroll(
            this.camera.scrollX,
            this.camera.scrollY
        );
    }
}
