class Character extends MovableObject{
    height = 280;
    width = 155;
    y = 80;
    speed = 10;
    world;
    prevX = 0;
    prevY = 0;
    stationaryFrameCount = 0;
    currentImage = 0;
    wasAboveGround = false;
    animationEnded = false;

    offset = {
        top: 100,
        bottom: 0,
        left: 30,
        right: 20
    }

    IMAGES_STANDING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_STANDING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.applyGravity();
        this.animate();
    }

    animate() {
        this.movementIntervalId = interval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.world.soundManager.play('walking_sound', 0.1);
            }

            if (this.world.keyboard.LEFT && this.x > 0 ) {
                this.moveLeft();
                this.otherDirection = true;
                this.world.soundManager.play('walking_sound', 0.1);
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.world.soundManager.play('jump_sound', 0.1);
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        this.animationIntervalId = interval(() => {
            if (this.positionUnchangedX() && this.positionUnchangedY() && !this.isDead() && !this.isHurt()) {
                this.handleStanding();
            } else if (this.isDead()) {
                this.handleDeath();
            } else if (this.isHurt()) {
                this.handleHurt();
            } else if (this.isAboveGround()) {  
                this.handleIsAboveGround();              
            } else if (this.world.keyboard.RIGHT && !this.isAboveGround() || this.world.keyboard.LEFT && !this.isAboveGround()) {
                this.handleWalking();
            }

            this.prevX = this.x;
            this.prevY = this.y;
        }, 120);
    }

    handleStanding() {
        this.playAnimation(this.IMAGES_STANDING);
        this.stationaryFrameCount++;
        if (this.isStandingStill()) {
            this.playAnimation(this.IMAGES_SLEEPING);
            this.world.soundManager.play('sleep_sound', 0.1);
        }
        this.wasAboveGround = false;
    }

    handleDeath() {
        hideMobileBtns();
        clearInterval(this.movementIntervalId);
        this.playAnimation(this.IMAGES_DEAD);
        this.world.soundManager.play('dead_sound', 0.1);
        this.stationaryFrameCount = 0;
        this.wasAboveGround = false;
        if (!this.animationEnded) {
            setTimeout(() => {
                this.world.soundManager.play('game_over_sound', 0.2);
                stopGame();
                selectEndScreen('zeroHp');
            }, 3000);
            this.animationEnded = true;
        }
    }

    handleHurt() {
        this.playAnimation(this.IMAGES_HURT);
        this.world.soundManager.play('hurt_sound', 0.1);
        this.stationaryFrameCount = 0;
        this.wasAboveGround = false;
    }

    handleIsAboveGround() {
        if (this.world.soundManager.sleep_sound.currentTime > 0) {
            this.world.soundManager.stop('sleep_sound');
        }
        if (this.world.keyboard.SPACE && !this.wasAboveGround) {
            this.currentImage = 0;
            this.playAnimation(this.IMAGES_JUMPING);
            this.stationaryFrameCount = 0;
        } else {
            this.playAnimation(this.IMAGES_JUMPING);
            this.stationaryFrameCount = 0;
        }
        this.wasAboveGround = true;
    }

    handleWalking() {
        if (this.world.soundManager.sleep_sound.currentTime > 0) {
            this.world.soundManager.stop('sleep_sound');
        }
        this.playAnimation(this.IMAGES_WALKING);
        this.stationaryFrameCount = 0;
        this.wasAboveGround = false;
    }

    positionUnchangedX() {
        return(this.x === this.prevX);
    }

    positionUnchangedY() {
        return(this.y === this.prevY);
    }

    isStandingStill() {
        return(this.stationaryFrameCount >= 20);
    }

    isInRange(mo) {
        return  this.x + this.width - this.offset.right > mo.x - 150 + mo.offset.right && 
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && 
        this.x + this.offset.left < mo.x + 300 + mo.width - mo.offset.right && 
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }
}

