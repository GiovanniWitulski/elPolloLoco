/**
 * Represents a game level, containing enemies, clouds, background objects, coins, and bottles.
 */
class Level {
    enemies = [];
    clouds = [];
    backgroundObjects = [];
    coins = [];
    bottles = [];
    level_end_x = 2250;
  
    /**
     * Creates a new level instance.
     *
     * @param {Enemy[]} enemies - An array of enemies in the level.
     * @param {Cloud[]} clouds - An array of clouds in the level.
     * @param {BackgroundObject[]} backgroundObjects - An array of background objects in the level.
     * @param {Coin[]} coins - An array of coins in the level.
     * @param {Bottle[]} bottles - An array of bottles in the level.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
      this.enemies = enemies;
      this.clouds = clouds;
      this.backgroundObjects = backgroundObjects;
      this.coins = coins;
      this.bottles = bottles;
    }
  }