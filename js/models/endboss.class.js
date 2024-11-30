/**
 * Represents the end boss enemy in the game.
 */
class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;
    energy = 100;
    hadFirstContact = false;
    canAttack = false;
    isAttacking = false;
    animationEnded = false;
  
    offset = {
      top: 90,
      bottom: 0,
      left: 10,
      right: 10
    }
  
    IMAGES_ALERT = [
      'img/4_enemie_boss_chicken/2_alert/G5.png',
      'img/4_enemie_boss_chicken/2_alert/G6.png',
      'img/4_enemie_boss_chicken/2_alert/G7.png',
      'img/4_enemie_boss_chicken/2_alert/G8.png',
      'img/4_enemie_boss_chicken/2_alert/G9.png',
      'img/4_enemie_boss_chicken/2_alert/G10.png',
      'img/4_enemie_boss_chicken/2_alert/G11.png',
      'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
  
    IMAGES_WALKING = [
      'img/4_enemie_boss_chicken/1_walk/G1.png',
      'img/4_enemie_boss_chicken/1_walk/G2.png',
      'img/4_enemie_boss_chicken/1_walk/G3.png',
      'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
  
    IMAGES_ATTACK = [
      'img/4_enemie_boss_chicken/3_attack/G13.png',
      'img/4_enemie_boss_chicken/3_attack/G14.png',
      'img/4_enemie_boss_chicken/3_attack/G15.png',
      'img/4_enemie_boss_chicken/3_attack/G16.png',
      'img/4_enemie_boss_chicken/3_attack/G17.png',
      'img/4_enemie_boss_chicken/3_attack/G18.png',
      'img/4_enemie_boss_chicken/3_attack/G19.png',
      'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
  
    IMAGES_HURT = [
      'img/4_enemie_boss_chicken/4_hurt/G21.png',
      'img/4_enemie_boss_chicken/4_hurt/G22.png',
      'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
  
    IMAGES_DEAD = [
      'img/4_enemie_boss_chicken/5_dead/G24.png',
      'img/4_enemie_boss_chicken/5_dead/G25.png',
      'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
  
    /**
     * Sets the world object for the end boss.
     *
     * @param {World} world - The world object.
     */
    setWorld(world) {
      this.world = world;
    }
  
    /**
     * Creates a new end boss instance.
     *
     * @param {World} world - The world object.
     */
    constructor(world) {
      super().loadImage(this.IMAGES_WALKING[0]);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_ALERT);
      this.loadImages(this.IMAGES_ATTACK);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_DEAD);
  
      this.x = 2400;
      this.speed = 0.15 + Math.random() * 0.75;
      this.animate();
      this.startTime = new Date().getTime();
      this.world = world;
    }
  
    /**
     * Animates the end boss, handling movement, attacks, and animation.
     */
    animate() {
      let i = 0;
  
      this.walkIntervalId = interval(() => {
        this.moveLeft();
        if (this.isDead()) {
          this.speed = 0;
        }
      }, 1000 / 60);
  
      this.animationIntervalId = interval(() => {
        i++;
        if (!this.isDead() && !this.world.character.isDead() && this.x < 0 && !gameEnd) {
          this.world.soundManager.play('boss_chicken_sound', 0.02);
        } else if (gameEnd) {
          this.world.soundManager.stop('boss_chicken_sound');
        }
        if (this.isDead()) {
          this.handleDeath();
        } else if (i < 10) {
          this.playAnimation(this.IMAGES_ALERT);
          this.speed = 0;
        } else if (this.isHurt()) {
          this.speed = 0.1;
          this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAttacking) {
          this.handleIsAttacking();
        } else if (this.canAttack) {
          this.handleCanAttack();
        } else {
          this.speed = 0.2;
          this.playAnimation(this.IMAGES_WALKING);
        }
        if (world.character.x > 1500 && !this.hadFirstContact) {
          i = 0;
          this.hadFirstContact = true;
        }
      }, 220);
  
      this.attackIntervalId = interval(() => {
        this.checkAtackRangeCollisons();
      }, 220);
    }
  
    /**
     * Handles the end boss's death animation and behavior.
     */
    handleDeath() {
      hideMobileBtns();
      this.playAnimation(this.IMAGES_DEAD);
      this.fallDown();
      if (!this.animationEnded) {
        setTimeout(() => {
          this.world.soundManager.play('win_sound', 0.2);
          stopGame();
          selectEndScreen('endbossDead');
        }, 3000);
        this.animationEnded = true;
      }
    }
  
    /**
     * Handles the end boss's attack animation and behavior while attacking.
     */
    handleIsAttacking() {
      this.playAnimation(this.IMAGES_ATTACK);
      this.y = 30;
      this.speed = 3;
      setTimeout(() => {
        this.y = 60;
        this.speed = 0.2;
      }, this.IMAGES_ATTACK.length * 220);
    }
  
    /**
     * Handles the end boss's attack animation and behavior when able to attack.
     */
    handleCanAttack() {
      this.isAttacking = true;
      this.canAttack = false;
      this.playAnimation(this.IMAGES_ATTACK);
      setTimeout(() => {
        this.y = 60;
        this.speed = 0.2;
        this.isAttacking = false;
      }, this.IMAGES_ATTACK.length * 220);
    }
  
    /**
     * Handles the end boss's attack cooldown.
     */
    attackCooldown() {
      let currentTime = new Date().getTime();
      let timePassed = (currentTime - this.startTime) / 1000;
  
      if (timePassed > 5) {
        this.canAttack = true;
        this.startTime = currentTime;
      }
    }
  
    /**
     * Checks if the character is within attack range and triggers the attack cooldown if true.
     */
    checkAtackRangeCollisons() {
      if (this.world.character.isInRange(this)) {
        this.attackCooldown();
      }
    }
}