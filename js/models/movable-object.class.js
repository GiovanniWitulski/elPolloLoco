class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    lastAttack = 0;
    startTime = new Date().getTime();
  
    /**
     * Applies gravity to the object, making it fall.
     */
    applyGravity() {
      interval(() => {
        if (this.isAboveGround() || this.speedY > 0) {
          this.y -= this.speedY;
          this.speedY -= this.acceleration;
        } else {
          this.y = 150;
        }
      }, 1000 / 25)
    }
  
    /**
     * Checks if the object is above the ground.
     *
     * @returns {boolean} True if the object is above ground, false otherwise.
     */
    isAboveGround() {
      if ((this instanceof ThrowableObject)) {
        return true;
      } else {
        return this.y < 150;
      }
    }
  
    /**
     * Checks if this object is colliding with another movable object.
     *
     * @param {MovableObject} mo - The other movable object to check collision with.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     */
    isColliding(mo) {
      return this.x + this.width - this.offset.right > mo.x + mo.offset.right &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }
  
    /**
     * Checks if this object is colliding with the top of another movable object.
     *
     * @param {MovableObject} mo - The other movable object to check collision with.
     * @returns {boolean} True if the objects are colliding at the top, false otherwise.
     */
    isCollidingTop(mo) {
      return (
        this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
        this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.speedY < 0
      );
    }
  
    /**
     * Reduces the object's energy when hit.
     */
    hit() {
      this.energy -= 20;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
    }
  
    /**
     * Checks if the object is currently hurt (within a short time frame after being hit).
     *
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
      let timePassed = new Date().getTime() - this.lastHit;
      timePassed = timePassed / 1000;
      return timePassed < 0.75;
    }
  
    /**
     * Checks if the object is dead (energy is 0).
     *
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
      return this.energy == 0;
    }
  
    /**
     * Plays an animation by cycling through an array of images.
     *
     * @param {string[]} images - An array of image paths representing the animation frames.
     */
    playAnimation(images) {
      let i = this.currentImage % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImage++
    }
  
    /**
     * Moves the object to the right.
     */
    moveRight() {
      this.x += this.speed;
    }
  
    /**
     * Moves the object to the left.
     */
    moveLeft() {
      this.x -= this.speed;
    }
  
    /**
     * Makes the object jump.
     */
    jump() {
      this.speedY = 30;
    }
  
    /**
     * Makes the object fall down.
     */
    fallDown() {
      this.y += 20;
    }
}