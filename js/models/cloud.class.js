class Cloud extends MovableObject {
    y = 30;
    width = 500;
    height = 250;

    IMAGES_CLOUD = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];
    
    constructor() {
        super().loadImage(this.IMAGES_CLOUD[0]);
        this.loadImages(this.IMAGES_CLOUD);
        this.x = 200 + Math.random() * 1500;
        this.animate();
    }

    animate() {
        setInterval( () => {
            this.moveLeft();
        }, 1000 / 60) ;
    }
}

