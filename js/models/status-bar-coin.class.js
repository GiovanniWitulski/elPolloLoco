/**
 * Represents the coin status bar in the game.
 */
class StatusBarCoin extends DrawableObject {
    IMAGES_COIN = [
      'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];
  
    percentage = 0;
  
    /**
     * Creates a new coin status bar instance.
     */
    constructor() {
      super();
      this.loadImages(this.IMAGES_COIN);
      this.x = 50;
      this.y = 60;
      this.width = 200;
      this.height = 60;
      this.setPercentage(this.percentage);
    }
  
    /**
     * Sets the percentage of the coin status bar.
     *
     * @param {number} percentage - The percentage to set (0-100).
     */
    setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.IMAGES_COIN[this.resolveImageIndex()];
      this.img = this.imageCache[path];
    }
  
    /**
     * Resolves the image index based on the current percentage.
     *
     * @returns {number} The image index.
     */
    resolveImageIndex() {
      if (this.percentage == 100) {
        return 5;
      } else if (this.percentage >= 80) {
        return 4;
      } else if (this.percentage >= 60) {
        return 3;
      } else if (this.percentage >= 40) {
        return 2;
      } else if (this.percentage >= 20) {
        return 1;
      } else {
        return 0
      }
    }
}