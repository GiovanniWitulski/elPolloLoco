class Bottle extends MovableObject{
    IMAGES_GROUND_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    offset = {
        top: 20,
        bottom: 10,
        left: 15,
        right: 25
    }

    constructor() {
        super().loadImage(this.IMAGES_GROUND_BOTTLE[0]);
        this.loadImages(this.IMAGES_GROUND_BOTTLE);
        this.x = 150 + Math.random() * 1000;
        this.y = 330 ;
        this.width = 100;
        this.height = 100;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_GROUND_BOTTLE);
        }, 380);
    }
}