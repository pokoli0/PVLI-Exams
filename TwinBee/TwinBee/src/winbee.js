export default class winbee extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key) {
        super(scene, x, y);

        this.winbee = this.scene.physics.add.sprite(x, y, key);
        
        // añade a la escena (game.js) el objeto entero
        this.scene.add.existing(this);

        this.speed = 100;

        // DISPAROS
        this.cooldown = 1000; // 1 bala por segundo
        this.canShoot = true; // empezamos sin haber disparado


        // registra la teclas
        this.dcha = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.izda = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.arriba = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.abajo = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.intro = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    preUpdate() {

        this.movimiento();
        this.tryShoot();

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

    tryShoot(){
        // Si se pulsa ESPACIO y aun no ha disparado
        if (this.intro.isDown && this.canShoot) {
        this.shoot(); // Dispara
        this.canShoot = false; // Será false hasta que pase un segundo.
        this.tiempoInicio = this.scene.time.now; // Registramos cuándo hemos disparado.
        }
        // Si pasamos el cooldown (1 segundo), podremos volver a disparar.
        if (this.scene.time.now - this.tiempoInicio >= this.cooldown) { 
            this.canShoot = true;

            // Resetea el tiempoInicio para que puedas contar nuevamente
            // this.tiempoInicio = null;
        }
    }

    shoot(){
        this.scene.instanciaBala(this.winbee.x,this.winbee.y);
        this.winbee.play('wshoot');
    }

}