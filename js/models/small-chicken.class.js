class SmallChicken extends MovableObject {
    y = 360;
    height = 65;
    width = 53;
    energy = 1;
  
    offset = {
      top: 8,
      bottom: 4,
      left: 4,
      right: 4
    }
  
    IMAGES_WALKING = [
      'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
      'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
      'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
  
    IMAGES_DEAD = [
      'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
  
    /**
     * Sets the world object for the small chicken.
     *
     * @param {World} world - The world object.
     */
    setWorld(world) {
      this.world = world;
    }
  
    /**
     * Creates a new small chicken instance.
     *
     * @param {World} world - The world object.
     */
    constructor(world) {
      super().loadImage(this.IMAGES_WALKING[0]);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_DEAD);
      this.world = world;
      this.x = 550 + Math.random() * 400;
      this.speed = 0.25 + Math.random() * 0.75;
  
      this.animate();
    }
  
    /**
     * Animates the small chicken, handling movement and animation.
     */
    animate() {
      this.movementIntervalId = interval(() => {
        this.moveLeft();
        if ((!this.isDead() || this.x < 0) && !gameEnd) {
          this.world.soundManager.play('small_chicken_sound', 0.02)
        } else if (gameEnd) {
          this.world.soundManager.stop('small_chicken_sound');
        }
      }, 1000 / 60);
  
      this.animationIntervalId = interval(() => {
        if (this.isDead()) {
          this.speed = 0;
          this.playAnimation(this.IMAGES_DEAD)
          this.fallDown();
        } else {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }, 90);
    }
}