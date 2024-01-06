export default class winbee extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key) {
        super(scene, x, y);

        this.winbee = this.scene.physics.add.sprite(x, y, key);
        
        // añade a la escena (game.js) el objeto entero
        this.scene.add.existing(this);

        this.speed = 100;

        this.canShoot = true;

        // registra la teclas
        this.dcha = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.izda = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.arriba = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.abajo = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.intro = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        
    }

    preUpdate(t, dt) {

        this.movimiento();
        this.disparo();

        // Método para que no se salga del canvas omg
        this.winbee.x = Phaser.Math.Clamp(this.winbee.x, 0, this.scene.sys.game.canvas.width);
        this.winbee.y = Phaser.Math.Clamp(this.winbee.y, 0, this.scene.sys.game.canvas.height);
        
    }

    movimiento(){
        // Restablece la velocidad antes de verificar las teclas
        this.winbee.body.setVelocity(0, 0);

        if (this.arriba.isDown) {
            this.winbee.body.setVelocityY(-this.speed);
            this.winbee.play('widle');
        }
        else if (this.abajo.isDown) {
            this.winbee.body.setVelocityY(this.speed);
            this.winbee.play('widle');
        }

        if (this.izda.isDown) {
            this.winbee.body.setVelocityX(-this.speed);
            this.winbee.play('wleft');
        }
        else if (this.dcha.isDown) {
            this.winbee.body.setVelocityX(this.speed);
            this.winbee.play('wright');
        }
    }

    disparo(){
        if(this.intro.isDown && this.canShoot){
            this.scene.instanciaBala(this.winbee.x, this.winbee.y);
            this.winbee.play('wshoot');
        }

        //Si se vuelve a levantar tecla
        if(this.space.isUp){ 
            this.canShoot = true
        }
    }

}