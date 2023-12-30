export default class Spaceship extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, tanque){
        super(scene, x, y);

        this.spaceship = this.scene.physics.add.sprite(x, y, 'spaceship');
        this.scene.add.existing(this);

        //para que no se mueva por las colisiones:
        this.spaceship.body.setImmovable(true); //esto no hace falta si usamos overlap
    }

    getSpaceshipSprite(){
        return this.spaceship;
    }
}