/**
 * Represents a throwable object in the game.
 */
class ThrowableObject extends MovableObject {
    world;
  
    IMAGES_BOTTLE_ROTATION = [
      'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
      'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
      'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
      'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
  
    IMAGES_BOTTLE_SPLASH = [
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
  
    offset = {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10
    }
  
    /**
     * Sets the world object for the throwable object.
     *
     * @param {World} world - The world object.
     */
    setWorld(world) {
      this.world = world;
    }
  
    /**
     * Creates a new throwable object instance.
     *
     * @param {number} x - The initial x-coordinate of the object.
     * @param {number} y - The initial y-coordinate of the object.
     */
    constructor(x, y) {
      super().loadImage(this.IMAGES_BOTTLE_ROTATION[0]);
      this.loadImages(this.IMAGES_BOTTLE_ROTATION);
      this.loadImages(this.IMAGES_BOTTLE_SPLASH);
      this.x = x;
      this.y = y;
      this.height = 70;
      this.width = 65;
      this.throw();
      this.animate();
    }
  
    /**
     * Throws the object by setting its initial speed and applying gravity.
     */
    throw() {
      this.speedY = 30;
      this.applyGravity();
      interval(() => {
        this.x += 10;
      }, 25);
    }
  
    /**
     * Animates the object by rotating it.
     */
    animate() {
      this.rotationIntervalId = setInterval(() => {
        this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
      }, 80);
    }
  
  
    /**
     * Makes the object splash at the specified coordinates.
     *
     * @param {number} x - The x-coordinate of the splash.
     * @param {number} y - The y-coordinate of the splash.
     */
    splash(x, y) {
      this.world.soundManager.play('glass_sound', 0.1);
      this.speedY = 0;
      this.speed = 0;
      this.acceleration = 0;
      this.x = x;
      this.y = y;
      this.height = 120;
      this.width = 105;
  
      this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
      clearInterval(this.rotationIntervalId);
    }
}