export default class bullet extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key) {
        super(scene, x, y);

        this.bullet = this.scene.physics.add.sprite(x, y, key);
        
        // añade a la escena (game.js) el objeto entero (INSTANCIA)
        this.scene.add.existing(this);

        this.speed = 100;

    }

    preUpdate(t, dt) {
        this.movimiento();

        // Al salir del canvas se destruye
        if(this.bullet.y < 0 || this.bullet.x < 0 || this.bullet.y > this.scene.sys.game.canvas.height || this.bullet.x > this.scene.sys.game.canvas.width){
            this.deleteBullet();
        }
    }

    movimiento(){
        this.bullet.body.setVelocityY(-this.speed);
    }

    deleteBullet(){
        this.bullet.destroy(true); //destruye sprite
        this.destroy(true); //destruye contenedor
    }

    // Para las colisiones
    getSprite(){
        return this.bullet;
    }
}