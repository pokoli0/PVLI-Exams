export default class Button extends Phaser.GameObjects.Container{
    constructor(scene, x, y, color, difficulty, callback){
        super(scene,x,y);

        this.hitbox = this.scene.add.rectangle(x,y,50,30,color);

        scene.add.existing(this);

        this.hitbox.setInteractive();
        
        this.hitbox.on('pointerdown', () => {
            //Callback
            callback(difficulty, this.scene);
        })

    }

}