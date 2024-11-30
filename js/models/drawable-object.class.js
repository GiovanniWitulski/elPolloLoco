class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;
  
    /**
     * Loads an image from the specified path.
     *
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
      this.img = new Image();
      this.img.src = path;
    }
  
    /**
     * Draws the object's image on the canvas.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
      try {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      } catch (e) {
        console.warn(e);
        console.log(this.img.src);
      }
    }
  
    /**
     * Draws a frame around the object for debugging purposes.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
      if (this instanceof Character || this instanceof SmallChicken || this instanceof Chicken
        || this instanceof Coin || this instanceof ThrowableObject || this instanceof Endboss || this instanceof Bottle) {
        ctx.beginPath(ctx);
        ctx.lineWidth = '2.5';
        if (this instanceof Character) {
          ctx.strokeStyle = hitboxes ? 'green' : 'transparent';
        } else if (this instanceof SmallChicken || this instanceof Chicken || this instanceof Endboss) {
          ctx.strokeStyle = hitboxes ? 'red' : 'transparent';
        } else if (this instanceof Coin) {
          ctx.strokeStyle = hitboxes ? 'blue' : 'transparent';
        } else if (this instanceof ThrowableObject) {
          ctx.strokeStyle = hitboxes ? 'orange' : 'transparent';
        } else if (this instanceof Bottle) {
          ctx.strokeStyle = hitboxes ? 'blue' : 'transparent';
        }
        ctx.rect(this.x + this.offset.right, this.y + this.offset.top, this.width - (this.offset.right + this.offset.left),
          this.height - (this.offset.top + this.offset.bottom));
        ctx.stroke();
      }
    }
  
    /**
     * Draws a larger frame around the Endboss for debugging purposes.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawBigFrame(ctx) {
      if (this instanceof Endboss) {
        ctx.beginPath(ctx);
        ctx.lineWidth = '2.5';
        ctx.strokeStyle = hitboxes ? 'pink' : 'transparent';
        ctx.rect(this.x - 150 + this.offset.right, this.y + this.offset.top, this.width + 300 - (this.offset.right + this.offset.left),
          this.height - (this.offset.top + this.offset.bottom));
        ctx.stroke();
      }
    }
  
    /**
     * Loads an array of images into the image cache.
     *
     * @param {string[]} arr - An array of image paths.
     */
    loadImages(arr) {
      arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
      });
    }
  }