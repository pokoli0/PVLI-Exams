Hola Paula, vamos a aprobar :)

-------------CREAR EL JUEGO-------------- en game.js
Cada escena que crees hay que importarla aquí, asi:
import Jetpac from "./Jetpac.js";




-----------CONFIGURAR FÍSICAS--------------

physics: {
            default: "arcade",
            arcade: {
                gravity: {y: 100},
                debug: true,
            }
        }

-----------CREAR GAMEOBJECTS--------------

export default class Meteor extends Phaser.GameObjects.Container{
    constructor(scene, x, y, key){
        super(scene, x, y);

        //añadir fisicas al objeto: 
        this.meteor = this.scene.physics.add.sprite(x, y, 'meteor');

        //Otros atributos
    }

    //Métodos, getters, setters
}

------------TILEMAPS----------------------

this.map = this.make.tilemap({
            key:'map',
            tileWidth: 64,
            tileHeight: 64
        })

        // añade
        // 1º el nombre de la imagen EN EL TILEMAP DEL JSON y
        // 2º el nombre de AQUI (para encontrar el primer key hay que irse al json, a tilset y mirar "name": "...." (LINEA 31)
        const tileset = this.map.addTilesetImage('ground_ts', 'mapSprites');
  
        //Las capas se crean individualmente
        this.floorLayer = this.map.createLayer('ground', tileset, 0, 0);


--------------MOVIMIENTOS-------------------




----------------INPUTS----------------------


---------------COLISIONES-----------------





---------------TEXTOS------------------


