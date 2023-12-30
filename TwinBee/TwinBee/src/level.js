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
        this.load.spitesheet('twinbee', './assets/images/twinbee.png',{frameWidth: 16, frameHeight: 16})
    }

    create(){
        //Constantes útiles jiji
        const canvasWidth = this.sys.game.config.width;  // Ancho del canvas
        const canvasHeight = this.sys.game.config.height;  // Alto del canvas

        //------BACKGROUND------
        this.add.sprite(canvasWidth/2, 0, 'background');

    }
}