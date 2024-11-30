/**
 * Manages the sounds in the game.
 */
class SoundManager {
    walking_sound = new Audio('audio/walking.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    throw_sound = new Audio('audio/throw.mp3');
    chicken_sound = new Audio('audio/chicken.mp3');
    glass_sound = new Audio('audio/glass.mp3');
    dead_sound = new Audio('audio/dead.mp3');
    game_over_sound = new Audio('audio/game_over.mp3');
    win_sound = new Audio('audio/win.mp3')
    snore_sound = new Audio('audio/snore_sound.mp3');
    small_chicken_sound = new Audio('audio/small_chicken.mp3');
    boss_chicken_sound = new Audio('audio/boss_chicken.mp3');
    sleep_sound = new Audio('audio/sleep.mp3');
    coin_sound = new Audio('audio/coin.mp3');
    bottle_sound = new Audio('audio/bottle.mp3');
  
    /**
     * Creates a new SoundManager instance and sets all audio objects to not preload.
     */
    constructor() {
      this.getAllAudioObjects().forEach(sound => {
        sound.preload = 'none';
      });
    }
  
    /**
     * Gets all audio objects managed by the SoundManager.
     *
     * @returns {Audio[]} An array of all audio objects.
     */
    getAllAudioObjects() {
      return [
        this.walking_sound,
        this.jump_sound,
        this.hurt_sound,
        this.throw_sound,
        this.chicken_sound,
        this.glass_sound,
        this.dead_sound,
        this.game_over_sound,
        this.snore_sound,
        this.small_chicken_sound,
        this.win_sound,
        this.boss_chicken_sound,
        this.sleep_sound,
        this.coin_sound,
        this.bottle_sound
      ];
    }
  
    /**
     * Plays the specified sound.
     *
     * @param {string} soundName - The name of the sound to play.
     * @param {number} [volume=1] - The volume of the sound (0-1).
     */
    play(soundName, volume = 1) {
      let sound = this[soundName];
      if (sound) {
        sound.volume = Math.min(1, volume + (overallVolume / 10));
        if (overallVolume > 0) {
          sound.play();
        }
      } else {
        console.error(`Sound "${soundName}" nicht gefunden.`);
      }
    }
  
    /**
     * Pauses the specified sound.
     *
     * @param {string} soundName - The name of the sound to pause.
     */
    pause(soundName) {
      let sound = this[soundName];
      if (sound) {
        sound.pause();
      } else {
        console.error(`Sound "${soundName}" nicht gefunden.`);
      }
    }
  
    /**
     * Stops the specified sound.
     *
     * @param {string} soundName - The name of the sound to stop.
     */
    stop(soundName) {
      let sound = this[soundName];
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      } else {
        console.error(`Sound "${soundName}" nicht gefunden.`);
      }
    }
  
    /**
     * Mutes or unmutes all sounds.
     *
     * @param {boolean} mute - Whether to mute or unmute the sounds.
     */
    muteAll(mute) {
      this.getAllAudioObjects().forEach(sound => {
        sound.muted = mute;
      });
    }
}