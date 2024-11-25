class Chicken extends MovableObject {
    y = 360;
    height = 65;
    width = 53;
    energy = 1;
    world;

    offset = {
        top: 0,
        bottom: 0,
        left: 2,
        right: 0
    }

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'

    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    setWorld(world) {
        this.world = world;
    }

    constructor(world) {
            super().loadImage(this.IMAGES_WALKING[0]);
            this.loadImages(this.IMAGES_WALKING);
            this.loadImages(this.IMAGES_DEAD);
            this.world = world;
            this.x = 700 + Math.random() * 600;
            this.speed = 0.15 + Math.random() * 0.75;
    
            this.animate();
    }

    animate() {
        this.movementIntervalId = interval( () => {
            this.moveLeft();
            
            if ((!this.isDead() || this.x < 0) && !gameEnd) {
                this.world.soundManager.play('chicken_sound', 0.02);
            } else if (gameEnd) {
                this.world.soundManager.stop('chicken_sound');
            }
        }, 1000 / 60);
        
        this.animationIntervalId = interval(() => {
            if (this.isDead()) {
                this.speed = 0;
                this.playAnimation(this.IMAGES_DEAD);
                this.fallDown();
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 90);
    }
}