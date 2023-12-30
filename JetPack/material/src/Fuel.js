export default class Fuel extends Phaser.GameObjects.Container{
    constructor(scene, x, y, key){
        super(scene, x, y);

        this.fuel = this.scene.physics.add.sprite(x, y, 'fuel');
        this.scene.add.existing(this);
    }

    getFuelSprite(){
        return this.fuel;
    }
}