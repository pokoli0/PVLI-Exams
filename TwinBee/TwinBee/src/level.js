export default class level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });
    }

    // informacion de la escena menu
    init(data){
        this.players = data.datos;
    }
}