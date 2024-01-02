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
        //Constantes útiles jiji
        const canvasWidth = this.sys.game.config.width;  // Ancho del canvas
        const canvasHeight = this.sys.game.config.height;  // Alto del canvas

        //------BACKGROUND------
        //Lo nombramos y creamos en canvasHeight. Si queremos que empiece desde el principio de la imagen,
        //en el Y tendremos que poner 0 y al avanzar -=1 (en el update)
        this.background = this.add.sprite(canvasWidth/2, canvasHeight, 'background');
    }

    update(){
        this.background.y += 0.5; //Movemos background, sensación de que estamos avanzando
        console.log(this.background.y);

        if (this.background.y >= this.sys.game.config.height) {
            // Reiniciamos la posición del fondo al principio
            this.background.y = 0;
        }
    }
}