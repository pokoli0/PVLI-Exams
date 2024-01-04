import twinbee from "./twinbee.js";
import winbee from "./winbee.js";
import bullet from "./bullet.js";

export default class level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });
    }

    // Información de la escena menu
    init(data){
        this.players = data.nPlayers;
    }

    preload(){
        //------CARGA DE IMAGENES------
        this.load.image('background', './assets/images/background_hcontrast.png'); //background.png: 256 x 1536
        this.load.image('bullet', './assets/images/bullet.png');

        //------CARGA DE SPRITESHEETS------
        this.load.spritesheet('twinbee', './assets/images/twinbee.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('winbee', './assets/images/winbee.png', {frameWidth: 16, frameHeight: 16});

        //------CARGA DE SONIDOS------
        this.load.audio('shoot', './assets/sounds/shoot.wav');


    }

    create(){
        //Constantes útiles (no uso const porque seria solo del ámbito create())
        this.canvasWidth = this.sys.game.config.width;  // Ancho del canvas
        this.canvasHeight = this.sys.game.config.height;  // Alto del canvas -> 256

        //------BACKGROUND------
        //Añadimos background en 0,0, con setOrigin!!
        this.background = this.add.image(0, 256, 'background');
        this.background.setOrigin(0, 1);  // La imagen desde la esquina inferior izquierda (porque se mueve de abajo a arriba, si se moviera de arriba abajo -> setOrigin(0,0))


        //------TWINBEE & WINBEE-------
        if(this.players == 1){
            this.twinbee = new twinbee(this, this.canvasWidth/2, this.canvasHeight/1.2, "twinbee");
        }
        else{
            this.twinbee = new twinbee(this, this.canvasWidth/4, this.canvasHeight/1.2, "twinbee");
            this.winbee = new winbee(this, this.canvasWidth/1.4, this.canvasHeight/1.2, "winbee");
        }

        //--------ANIMACIONES-------
        this.animaciones(); // Método porque ocupa mucho
        
        //-------SONIDOS----------
        // En el container, con this.scene.sound.play('shoot');


        //------POOL DE BULLETS---------
        // Creamos grupo y método instanciaBala()
        this.bulletGroup = this.add.group();

        
        
        //para dejar de usarlo
        //this.time.removeEvent(timer);

        
        
    }

    // Se podrá instanciar una bala por segundo.
    instanciaBala(x, y){
        //Instancia de la bala
        this.bullet = new bullet(this, x, y, 'bullet'); //import bullet.js!

        //La añadimos al grupo
        this.bulletGroup.add(this.bullet);

        // Sonido al instanciar
        this.sound.play('shoot');

        // COLISIONES DE LA BALA
        // *** OVERLAP *** detecta si dos objetos se superponen SIN provocar colision fisica
        // Phaser.Physics.Arcade.World.overlap(object1, object2, callback);
        //this.physics.add.overlap(this.playerObj.getPlayerSprite(), this.bullet.getSprite(), this.destroyEnemy, null, this);
    }

    // El enemigo colisiona con una bala
    destroyEnemy(){
        
    }

    win(){
        console.log("win");
    }

    
    update(){
        this.background.y += 0.5; //Movemos background de abajo a arriba, sensación de que estamos avanzando
        //console.log(this.background.y);

        //Ganar el juego
        if(this.background.y == this.background.height){
            this.win();
        }

        //-------------PARALLAX-------------- (en TwinBee no hace falta)
        // if (this.background.y >= this.background.height) {  // Cuando la pos en Y sea mayor o igual al alto de la imagen
        //     this.background.y = this.canvasHeight;          // Reiniciamos la posición del fondo al canvasHeight
        // }


    }

    animaciones(){
        this.anims.create({
            key: 'idle',  // Nombre único de la animación
            frames: this.anims.generateFrameNumbers('twinbee', { start: 0, end: 0 }),  // Rango de frames
            frameRate: 10,  // Velocidad de reproducción en frames por segundo
            repeat: -1  // -1 para repetir indefinidamente, 0 para reproducir una vez
        });
        this.anims.create({
            key: 'left',  // Nombre único de la animación
            frames: this.anims.generateFrameNumbers('twinbee', { start: 1, end: 1 }),  // Rango de frames
            frameRate: 10,  // Velocidad de reproducción en frames por segundo
            repeat: -1  // -1 para repetir indefinidamente, 0 para reproducir una vez
        });
        this.anims.create({
            key: 'right',  // Nombre único de la animación
            frames: this.anims.generateFrameNumbers('twinbee', { start: 2, end: 2 }),  // Rango de frames
            frameRate: 10,  // Velocidad de reproducción en frames por segundo
            repeat: -1  // -1 para repetir indefinidamente, 0 para reproducir una vez
        });
        this.anims.create({
            key: 'shoot',  // Nombre único de la animación
            frames: this.anims.generateFrameNumbers('twinbee', { start: 3, end: 3 }),  // Rango de frames
            frameRate: 10,  // Velocidad de reproducción en frames por segundo
            repeat: -1  // -1 para repetir indefinidamente, 0 para reproducir una vez
        });
        this.anims.create({
            key: 'widle',  // Nombre único de la animación
            frames: this.anims.generateFrameNumbers('winbee', { start: 0, end: 0 }),  // Rango de frames
            frameRate: 10,  // Velocidad de reproducción en frames por segundo
            repeat: -1  // -1 para repetir indefinidamente, 0 para reproducir una vez
        });
        this.anims.create({
            key: 'wleft',  // Nombre único de la animación
            frames: this.anims.generateFrameNumbers('winbee', { start: 1, end: 1 }),  // Rango de frames
            frameRate: 10,  // Velocidad de reproducción en frames por segundo
            repeat: -1  // -1 para repetir indefinidamente, 0 para reproducir una vez
        });
        this.anims.create({
            key: 'wright',  // Nombre único de la animación
            frames: this.anims.generateFrameNumbers('winbee', { start: 2, end: 2 }),  // Rango de frames
            frameRate: 10,  // Velocidad de reproducción en frames por segundo
            repeat: -1  // -1 para repetir indefinidamente, 0 para reproducir una vez
        });
        this.anims.create({
            key: 'wshoot',  // Nombre único de la animación
            frames: this.anims.generateFrameNumbers('winbee', { start: 3, end: 3 }),  // Rango de frames
            frameRate: 10,  // Velocidad de reproducción en frames por segundo
            repeat: -1  // -1 para repetir indefinidamente, 0 para reproducir una vez
        });
    }
}