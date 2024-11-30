/**
 * Represents the game world, managing the character, enemies, objects, and game logic.
 */
class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    isMuted = false;
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    throwableObjects = [];
    throwedObject = [];
    soundManager = new SoundManager();
    lastThrowTime = 0;
    lastHitTime = 0;
  
    /**
     * Sets the world object for all objects in the given array.
     *
     * @param {World} world - The world object.
     * @param {object[]} objects - An array of objects to set the world for.
     */
    setWorldForObjects(world, objects) {
      objects.forEach(object => {
        if (typeof object.setWorld === 'function') {
          object.setWorld(world);
        }
      });
    }
  
    /**
     * Creates a new world instance.
     *
     * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
     * @param {Keyboard} keyboard - The keyboard input object.
     */
    constructor(canvas, keyboard) {
      this.ctx = canvas.getContext('2d');
      this.canvas = canvas;
      this.keyboard = keyboard;
      this.draw();
      this.setWorld();
      this.run();
      this.level = level1;
  
      this.allAudioObjects = [];
  
      this.level.enemies.forEach(enemy => {
        if (enemy instanceof Endboss) {
          enemy.world = this;
        }
      });
      this.allAudioObjects = this.soundManager.getAllAudioObjects();
  
      this.setWorldForObjects(this, [
        this.character, ...this.level.enemies,
      ]);
      console.log(this.level.enemies);
      this.allAudioObjects = this.soundManager.getAllAudioObjects();
  
      document.addEventListener('keydown', (event) => {
        if (event.key === 'm' || event.key === 'M') {
          this.toggleMute();
        }
      });
  
      console.log(this.allAudioObjects);
    }
  
    /**
     * Sets the world object for the character.
     */
    setWorld() {
      this.character.world = this;
    }
  
    /**
     * Runs the game loop, checking for collisions and updating game logic.
     */
    run() {
      interval(() => {
        this.checkCollisons();
        this.checkThrowObjects();
      }, 100);
    }
  
    /**
     * Checks if the character is throwing objects and handles the throwing logic.
     */
    checkThrowObjects() {
      if (this.keyboard.D && this.throwableObjects.length > 0) {
        let now = Date.now();
  
        if (now - this.lastThrowTime >= 1200) {
          this.playThrowSound();
          let throwBottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
          throwBottle.setWorld(this);
          this.throwedObject.push(throwBottle)
          this.throwableObjects.pop();
          this.statusBarBottle.setPercentage(this.statusBarBottle.percentage - 20);
          this.lastThrowTime = now;
        }
      }
    }
  
    /**
     * Plays the throw sound effect.
     */
    playThrowSound() {
      this.soundManager.stop('throw_sound');
      this.soundManager.play('throw_sound', 0.1);
    }
  
    /**
     * Checks for various collisions in the game.
     */
    checkCollisons() {
      this.checkThrowedObjectCollisions();
      this.checkBottleCollisons();
      this.checkCoinCollisons();
      this.checkEnemyCollisons();
    }
  
    /**
     * Checks for collisions between thrown objects and enemies.
     */
    checkThrowedObjectCollisions() {
      this.level.enemies.forEach((enemy) => {
        this.throwedObject.forEach((throwObj, throwObjIndex) => {
          if (throwObj.isColliding(enemy)) {
            throwObj.splash(throwObj.x, throwObj.y);
  
            setTimeout(() => {
              this.removeThrowedObject(throwObjIndex);
            }, 110);
            enemy.hit();
          }
        });
      });
    }
  
    /**
     * Removes a thrown object from the game.
     *
     * @param {number} throwObjIndex - The index of the thrown object to remove.
     */
    removeThrowedObject(throwObjIndex) {
      this.throwedObject.splice(throwObjIndex, 1);
    }
  
    /**
     * Checks for collisions between the character and enemies.
     */
    checkEnemyCollisons() {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isCollidingTop(enemy) && this.character.isAboveGround()) {
          this.character.jump();
          enemy.hit();
        } else if (this.character.isColliding(enemy) && !this.character.isAboveGround() && !this.character.isHurt()) {
          this.character.hit();
          this.statusBarHealth.setPercentage(this.character.energy);
        }
      });
    }
  
    /**
     * Checks for collisions between the character and coins.
     */
    checkCoinCollisons() {
      this.level.coins.forEach((coin, index) => {
        if (this.character.isColliding(coin)) {
          this.soundManager.stop('coin_sound');
          this.soundManager.play('coin_sound', 0.1);
          this.level.coins.splice(index, 1);
          this.statusBarCoin.setPercentage(this.statusBarCoin.percentage + 20);
        }
      });
    }
  
    /**
     * Checks for collisions between the character and bottles.
     */
    checkBottleCollisons() {
      this.level.bottles.forEach((bottle, index) => {
        if (this.character.isColliding(bottle)) {
          this.soundManager.stop('bottle_sound');
          this.soundManager.play('bottle_sound', 0.1);
          this.level.bottles.splice(index, 1);
          this.statusBarBottle.setPercentage(this.statusBarBottle.percentage + 20);
          this.throwableObjects.push(new ThrowableObject);
        }
      });
    }
  
    /**
     * Draws the game world on the canvas.
     */
    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObjects);
      this.addObjectsToMap(this.level.clouds);
  
      this.ctx.translate(-this.camera_x, 0);
      this.addToMap(this.statusBarHealth);
      this.addToMap(this.statusBarCoin);
      this.addToMap(this.statusBarBottle);
  
      this.ctx.translate(this.camera_x, 0);
      this.addToMap(this.character);
      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.throwedObject);
      this.addObjectsToMap(this.level.coins);
      this.addObjectsToMap(this.level.bottles);
  
      this.ctx.translate(-this.camera_x, 0);
  
      let self = this;
      requestAnimationFrame(function () {
        if (gameEnd == false) {
          self.draw();
        }
      });
    }
  
    /**
     * Adds an array of objects to the game map.
     *
     * @param {DrawableObject[]} objects - The array of objects to add.
     */
    addObjectsToMap(objects) {
      objects.forEach(o => {
        this.addToMap(o);
      });
    }
  
    /**
     * Adds a single object to the game map.
     *
     * @param {DrawableObject} mo - The object to add.
     */
    addToMap(mo) {
      if (mo.otherDirection) {
        this.flipImage(mo);
      }
      mo.draw(this.ctx);
      mo.drawFrame(this.ctx);
      mo.drawBigFrame(this.ctx);
  
      if (mo.otherDirection) {
        this.flipImageBack(mo);
      }
    }
  
    /**
     * Flips the image of an object horizontally.
     *
     * @param {DrawableObject} mo - The object to flip.
     */
    flipImage(mo) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0)
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
  
    /**
     * Restores the flipped image of an object.
     *
     * @param {DrawableObject} mo - The object to restore.
     */
    flipImageBack(mo) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  
    /**
     * Toggles the mute state of the game's sound.
     */
    toggleMute() {
      this.isMuted = !this.isMuted;
      this.soundManager.muteAll(this.isMuted);
    }
}