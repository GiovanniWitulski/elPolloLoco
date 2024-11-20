class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn(e);
            console.log(this.img.src);
        }
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof SmallChicken || this instanceof Chicken
            || this instanceof Coin || this instanceof ThrowableObject || this instanceof Endboss || this instanceof Bottle) {
            ctx.beginPath(ctx);
            ctx.lineWidth = '2.5';
            if (this instanceof Character) {
                ctx.strokeStyle = hitboxesVisible ? 'green' : 'transparent';
            } else if (this instanceof SmallChicken || this instanceof Chicken || this instanceof Endboss) {
                ctx.strokeStyle = hitboxesVisible ? 'red' : 'transparent';
            } else if (this instanceof Coin) {
                ctx.strokeStyle = hitboxesVisible ? 'blue' : 'transparent';
            } else if (this instanceof ThrowableObject) {
                ctx.strokeStyle = hitboxesVisible ? 'orange' : 'transparent';
            } else if (this instanceof Bottle) {
                ctx.strokeStyle = hitboxesVisible ? 'blue' : 'transparent';
            } 
            ctx.rect(this.x + this.offset.right, this.y + this.offset.top, this.width - (this.offset.right + this.offset.left),
                this.height - (this.offset.top + this.offset.bottom));
            ctx.stroke();   
        }
    }

    drawBigFrame(ctx) {
        if (this instanceof Endboss) {
            ctx.beginPath(ctx);
            ctx.lineWidth = '2.5';
            hitboxesVisible ? ctx.strokeStyle = 'pink' : ctx.strokeStyle = 'red';
            ctx.rect(this.x - 150 + this.offset.right, this.y + this.offset.top, this.width + 300 - (this.offset.right + this.offset.left),
                    this.height - (this.offset.top + this.offset.bottom));
            ctx.stroke();
        }
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}