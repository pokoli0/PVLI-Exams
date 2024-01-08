export default class twinbee extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key) {
        super(scene, x, y);

        this.twinbee = this.scene.physics.add.sprite(x, y, key);
        
        // añade a la escena (level.js) el objeto entero
        this.scene.add.existing(this);

        this.speed = 100;

        // CONTADOR DISPAROS
        this.cooldown = 1000; // 1 bala por segundo

        // registra la teclas
        this.w = this.scene.input.keyboard.addKey('W');
        this.a = this.scene.input.keyboard.addKey('A');
        this.s = this.scene.input.keyboard.addKey('S');
        this.d = this.scene.input.keyboard.addKey('D');
        this.space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //Si sólo queremos reaccionar ante un clic: 
        //if (Phaser.Input.Keyboard.JustDown(this.w)) { ... }

    }

    preUpdate() {
        this.movimiento();
        this.tryShoot();

        // Al pulsar la tecla de espacio, registra el tiempo actual
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            this.tiempoInicio = this.scene.time.now; 
            console.log(this.tiempoInicio)
        }

        // Método para que no se salga del canvas omg
        this.twinbee.x = Phaser.Math.Clamp(this.twinbee.x, 0, this.scene.sys.game.canvas.width);
        this.twinbee.y = Phaser.Math.Clamp(this.twinbee.y, 0, this.scene.sys.game.canvas.height);
    }

    movimiento(){
        // Restablece la velocidad antes de verificar las teclas
        this.twinbee.body.setVelocity(0, 0);

        if (this.w.isDown) {
            this.twinbee.body.setVelocityY(-this.speed);
            this.twinbee.play('idle');
        } 
        else if (this.s.isDown) {
            this.twinbee.body.setVelocityY(this.speed);
            this.twinbee.play('idle');
        }

        if (this.a.isDown) {
            this.twinbee.body.setVelocityX(-this.speed);
            this.twinbee.play('left');
        } 
        else if (this.d.isDown) {
            this.twinbee.body.setVelocityX(this.speed);
            this.twinbee.play('right');
        }
    }

    tryShoot(){
        if (this.tiempoInicio && this.scene.time.now - this.tiempoInicio >= this.cooldown && !this.hasShoot) {
            console.log("Ha pasado 1000 ms desde que pulsaste la tecla de espacio");
            this.shoot();

            // Resetea el tiempoInicio para que puedas contar nuevamente
            this.tiempoInicio = null;
            this.hasShoot = true;
        }
    }

    shoot(){
        this.scene.instanciaBala(this.twinbee.x,this.twinbee.y);
    }




}