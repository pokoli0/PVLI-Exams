export default class enemy extends Phaser.GameObjects.Container { 
    constructor(scene, x, y, key) {
        super(scene, x, y);

        // Para que aparezca en escena (damos x, y y key en level.js):
        this.enemy = this.scene.physics.add.sprite(x, y, key);
        this.scene.add.existing(this);

        //Animacion constante.
        this.enemy.play('eidle');

        this.speed = 50;
    

        // Configurar las propiedades de física, como la gravedad
        // this.setGravityY(0);
    }

    preUpdate() {
        this.movement();
    }

    movement(){
        this.enemy.body.setVelocityY(this.speed);

        // Acceder al objeto 'body' para realizar ajustes específicos (si es Phaser.Physics.Arcade.Sprite)
        // Por ejemplo, cambiar la gravedad solo para este sprite
        // this.enemy.body.gravity.y = 100;

        // Si this es un sprite sin físicas (Phaser.GameObjects.Sprite)
        // this.y += this.speed; // El movimiento será modificando su posición.

    }
}