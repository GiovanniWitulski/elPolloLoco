/**
 * Represents a background object in the game.
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
  
    /**
     * Creates a new background object instance.
     *
     * @param {string} imagePath - The path to the image of the background object.
     * @param {number} x - The initial x-coordinate of the object.
     * @param {number} y - The initial y-coordinate of the object.
     */
    constructor(imagePath, x, y) {
      super().loadImage(imagePath);
      this.x = x;
      this.y = 480 - this.height;
    }
  }