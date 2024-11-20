class Coin extends MovableObject {

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    offset = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
    }

    constructor() {
        super().loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        this.x = 200 + Math.random() * 2000;
        this.y = 80 +  Math.random() * 200;
        this.width = 150;
        this.height = 150;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 280);
    }
}