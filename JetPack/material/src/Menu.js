import Button from "./Button.js";

export default class Menu extends Phaser.Scene{
    constructor(){
        super({key: 'Menu'});
    }

    preload(){
        this.load.image('mapSprites', './assets/sprites/tileset.png');
    }

    create(){
        this.easyButton = new Button(this, 50, 30, '0x63ff4f', 'easy', this.playGame);
        this.midButton = new Button(this, 50, 70, 0x63ff4f, 'mid', this.playGame);
        this.hardButton = new Button(this, 50, 110, 0x63ff4f, 'hard', this.playGame);
    }

    
    playGame(mode, scene){
        scene.scene.start("Jetpac", {datos: mode})
    }
}