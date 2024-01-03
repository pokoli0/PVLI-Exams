export default class twinbee extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key) {
        super(scene, x, y);

        this.twinbee = this.scene.physics.add.sprite(x, y, key);

        
        // añade a la escena (game.js) el objeto entero
        this.scene.add.existing(this);

        this.speed = 100;

        // registra la teclas
        this.w = this.scene.input.keyboard.addKey('W');
        this.a = this.scene.input.keyboard.addKey('A');
        this.s = this.scene.input.keyboard.addKey('S');
        this.d = this.scene.input.keyboard.addKey('D');
        this.space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    preUpdate(t, dt) {

        this.movimiento();

        // Método para que no se salga del canvas omg
        this.twinbee.x = Phaser.Math.Clamp(this.twinbee.x, 0, this.scene.sys.game.canvas.width);
        this.twinbee.y = Phaser.Math.Clamp(this.twinbee.y, 0, this.scene.sys.game.canvas.height);
    }

    movimiento(){
        // Restablece la velocidad antes de verificar las teclas
        this.twinbee.body.setVelocity(0, 0);

        if (this.w.isDown) {
            this.twinbee.body.setVelocityY(-this.speed);
        } else if (this.s.isDown) {
            this.twinbee.body.setVelocityY(this.speed);
        }

        if (this.a.isDown) {
            this.twinbee.body.setVelocityX(-this.speed);
        } else if (this.d.isDown) {
            this.twinbee.body.setVelocityX(this.speed);
        }
    }

    disparo(){

    }

}