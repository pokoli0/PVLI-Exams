export default class Player extends Phaser.GameObjects.Container {

    //
    constructor(scene, x, y, key) {
        super(scene, x, y);

        // crea un sprite de ARCADE con fisicas con la posicion y la imagen
        // en este caso spritesheet (esta como 'jett' ahra pero paso de mirarlo,
        // deberia ser key)
        this.jett = this.scene.physics.add.sprite(x, y, 'jett');

        // añade a la escena (jetpac.js) el objeto entero
        this.scene.add.existing(this);

        this.speed = 100;

        // registra la teclas
        this.w = this.scene.input.keyboard.addKey('W');
        this.a = this.scene.input.keyboard.addKey('A');
        this.s = this.scene.input.keyboard.addKey('S');
        this.d = this.scene.input.keyboard.addKey('D');

        // añade a la escena (jetpac.js) el objeto entero
        this.scene.add.existing(this);
    }

    preUpdate(t, dt) {
        // el preupdate del super creo CREO que solo hace flata si la clase fuera tipo
        // Phaser.GameObjects.Sprite, pero al ser container parece que no hace falta...?
		//super.preUpdate(t, dt);

        // si pulsa la W
        if(this.w.isDown){
            this.propulsar();
        }
        else if (this.a.isDown){
            this.move(-this.speed);
        }
        else if(this.d.isDown){
            this.move(this.speed);
        }
        
        //si suelta la a o la d , se para en el eje x
        else if(this.a.isUp && this.d.isUp){
            this.jett.body.setVelocityX(0);
        }
    }

    propulsar(){

        // this.jett coge el objeto (el sprite), mientras que .body llega a la parte
        // que controla las fisicas. .velocity llega a la velocidad que tiene el
        // body y .y es entendible

        // setVelocityY es un atajo porque creo que se podria hacer un -=

        // si la velocidad en la Y es mayor que -80 sigue propulsando, ponemos tb limite superior
        if(this.jett.body.velocity.y > -80 && this.jett.y >= 20){

            // settea la velocidad del cuerpo de jett (el sprite del personaje)
            this.jett.body.setVelocityY(this.jett.body.velocity.y - 10);

            // animacion
            this.jett.play('jumpingJett');
        }
    }

    move(dir){

        // le pone una velocidad y una direccion al body del objeto.
        // en principio hay que pasarle una velocidad (this.speed) 
        // con un signo para indicar la direccion
        this.jett.body.setVelocityX(dir);

        // MOVIMIENTO TOROIDAL: basicamente significa que cuando se pasa de un 
        // lado aparece en el otro. Es tan facil como cuando llegues a un extremo
        // le pones la posicion del otro extremo
        if(this.jett.x <= 0){
            // this.scene.sys.game.canvas.width devuelve la anchura del canvas
            // this.scene para coger la escena donde esta este objeto (en este caso
            // jetpac.js), de ahi ya sys.game.canvas es para coger el canvas del juego.
            // BASICAMENTE: para usar sys.game.canvas hace falta sacarlo de una escena
            this.jett.x = this.scene.sys.game.canvas.width;
        }
        else if(this.jett.x >= this.scene.sys.game.canvas.width){
            this.jett.x = 0;
        }
    }

    getPlayerSprite(){
        return this.jett;
    }
}