class MovableObject extends DrawableObject {
    speed = 0.15
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    lastAttack = 0;
    startTime = new Date().getTime();  //Jump Soound anpassen "soundmanager"

    applyGravity() {
        interval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;   
            }  else { 
                this.y = 150; 
            }
        },1000 / 25)
    }

    isAboveGround() {
        if ((this instanceof ThrowableObject)) {
            return true;
        } else {
            return this.y < 150;
        }
    }
    
    isColliding(mo) {
        return  this.x + this.width - this.offset.right > mo.x + mo.offset.right && 
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && 
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right && 
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    isCollidingTop(mo) {
        return (
            this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&  
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&   
            this.speedY < 0                                                  
        );
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000; 
        return timePassed < 0.5;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
            this.x -= this.speed;
    }

    jump() {
        	this.speedY = 30;
    }

    fallDown() {
        this.y += 20;
    }
}