class SoundManager {
    walking_sound = new Audio('audio/walking.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    throw_sound = new Audio('audio/throw.mp3');
    chicken_sound = new Audio ('audio/chicken.mp3');
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

    // js.doc
    // Landing Page

    constructor() {
        this.getAllAudioObjects().forEach(sound => {
          sound.preload = 'none';
        });
    }
    
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

    play(soundName, volume = 1) {
        let sound = this[soundName]; 
        if (sound) {
            sound.volume = volume;
            sound.play();
        } else {
            console.error(`Sound "${soundName}" nicht gefunden.`);
        }
    }

    pause(soundName) {
        let sound = this[soundName];
        if (sound) {
            sound.pause();
        } else {
            console.error(`Sound "${soundName}" nicht gefunden.`);
        }
    }

    stop(soundName) {
        let sound = this[soundName];
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        } else {
            console.error(`Sound "${soundName}" nicht gefunden.`);
        }
    }

    muteAll(mute) {
        this.getAllAudioObjects().forEach(sound => {
            sound.muted = mute;
        });
    }
}