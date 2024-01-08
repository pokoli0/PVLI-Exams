
-------------CREAR EL JUEGO-------------- en game.js
Cada escena que crees hay que importarla aquí, asi:
import Jetpac from "./Jetpac.js";
y añadirla en el listado de scenes



-----------CONFIGURAR FÍSICAS--------------

physics: {
            default: "arcade",
            arcade: {
                gravity: {y: 100},
                debug: true, // esto es para que se muestren los colliders y demas
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

Cuando usas this.physics.add.sprite(x, y, key) para crear un sprite con físicas en Phaser, se crea un componente body automáticamente. Aquí hay algunos aspectos clave del objeto body:

Propiedades del body:
   · x, y: Las coordenadas x e y del objeto en el mundo del juego.
   · velocity: La velocidad actual del objeto en píxeles por segundo, tanto en la dirección x como en la y.
   · acceleration: La aceleración aplicada al objeto en píxeles por segundo al cuadrado.
   · gravity: La gravedad aplicada al objeto en píxeles por segundo al cuadrado.
   · bounce: El factor de rebote que controla la elasticidad de las colisiones.

Métodos del body:

    · setVelocity(x, y): Establece la velocidad del objeto en las direcciones x e y.
    · setAcceleration(x, y): Establece la aceleración del objeto.
    · setGravity(x, y): Establece la gravedad aplicada al objeto.
    · setBounce(x, y): Establece el factor de rebote para las colisiones.
    · setSize(width, height): Establece el tamaño del área de colisión del objeto.

En este ejemplo, el sprite se moverá hacia la derecha con una velocidad de 100 píxeles por segundo, 
experimentará la gravedad hacia abajo con una aceleración de 200 píxeles por segundo al cuadrado 
y rebotará en las colisiones con un factor de rebote del 50%.
    sprite.body.setVelocity(100, 0);
    sprite.body.setGravityY(200);
    sprite.body.setBounce(0.5);

----------------INPUTS----------------------
Mira juego de twinbee!

---------------COLISIONES-----------------
// Crear dos sprites
var sprite1 = this.physics.add.sprite(100, 100, 'sprite1');
var sprite2 = this.physics.add.sprite(200, 200, 'sprite2');

// Habilitar físicas para los sprites
this.physics.world.enable([sprite1, sprite2]);

// Configurar colisiones entre sprite1 y sprite2
this.physics.add.collider(sprite1, sprite2, function() {
    console.log('Colisión entre sprite1 y sprite2');
});

---------------SOLAPAMIENTOS-----------------
// Crear dos sprites
var sprite1 = this.physics.add.sprite(100, 100, 'sprite1');
var sprite2 = this.physics.add.sprite(200, 200, 'sprite2');

// Habilitar físicas para los sprites
this.physics.world.enable([sprite1, sprite2]);

// Configurar solapamiento entre sprite1 y sprite2
this.physics.add.overlap(sprite1, sprite2, function() {
    console.log('Solapamiento entre sprite1 y sprite2');
});



---------------TEXTOS------------------
var texto = this.add.text(x, y, 'Tu texto aquí', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });
texto.text = 'Nuevo texto';
function create() {
    // Crear un objeto Text en las coordenadas (100, 100)
    var texto = this.add.text(100, 100, 'Hola Phaser', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });

    // Modificar el texto después de 2 segundos
    this.time.delayedCall(2000, function() {
        texto.text = '¡Texto Modificado!';
    }, [], this);
}

---------------TEMPORIZADORES------------------
var evento = this.time.addEvent({
    delay: 1000,
    callback: function() {
        console.log('Este mensaje se repetirá cada segundo');
    },
    callbackScope: this,
    repeat: 3 // Se repetirá 3 veces
});

this.time.removeEvent(evento); // Cancelar temporizador

--------------CONTADORES---------------------
ver twinbee -> contador para disparar cada X tiempo

