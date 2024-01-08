export default class enemy extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key) {
        super(scene, x, y);

        this.enemy = this.scene.physics.add.sprite(x, y, key);

        // añade a la escena (level.js) el objeto entero
        this.scene.add.existing(this);

        this.enemy.play('eidle');

        this.speed = 50;
    
    }

    preUpdate(t, dt) {
        this.movement();
    }

    movement(){
        this.enemy.body.setVelocityY(this.speed);
        
    }
}