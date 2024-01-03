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

        //------CARGA DE SPRITESHEETS------
        this.load.spritesheet('twinbee', './assets/images/twinbee.png', {frameWidth: 16, frameHeight: 16})
    }

    create(){
        //Constantes útiles (no uso const porque seria solo del ámbito create())
        this.canvasWidth = this.sys.game.config.width;  // Ancho del canvas
        this.canvasHeight = this.sys.game.config.height;  // Alto del canvas -> 256

        //------BACKGROUND------
        //Añadimos background en 0,0, con setOrigin!!
        this.background = this.add.image(0, 256, 'background');
        this.background.setOrigin(0, 1);  // La imagen desde la esquina inferior izquierda
    }

    update(){
        this.background.y += 0.5; //Movemos background de abajo a arriba, sensación de que estamos avanzando
        //console.log(this.background.y);

        //-------------PARALLAX-------------- (en TwinBee no hace falta)
        // if (this.background.y >= this.background.height) {  // Cuando la pos en Y sea mayor o igual al alto de la imagen
        //     this.background.y = this.canvasHeight;          // Reiniciamos la posición del fondo al canvasHeight
        // }
    }
}