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

    setWorldForObjects(world, objects) {
        objects.forEach(object => {
            if (typeof object.setWorld === 'function') {
                object.setWorld(world);
            }
        });
    }

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
            if (event.key === 'm' || event.key === 'M' || muteBtn) {
                this.toggleMute(); 
            }
        });

        console.log(this.allAudioObjects);
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        interval(() => {
            this.checkCollisons();
            this.checkThrowObjects();
        }, 100);
    }

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

    playThrowSound() { 
        this.soundManager.stop('throw_sound');
        this.soundManager.play('throw_sound', 0.1);
    }

    checkCollisons() {
        this.checkThrowedObjectCollisions();
        this.checkBottleCollisons();
        this.checkCoinCollisons();
        this.checkEnemyCollisons();
    }

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
      
    removeThrowedObject(throwObjIndex) {
        this.throwedObject.splice(throwObjIndex, 1);
    }
    
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
        requestAnimationFrame(function() {
            if (gameEnd == false) {
                self.draw();   
            }
        });
    }

    addObjectsToMap(objects) {
            objects.forEach(o => {
            this.addToMap(o);
        });
    }

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

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        this.soundManager.muteAll(this.isMuted);
    }
}