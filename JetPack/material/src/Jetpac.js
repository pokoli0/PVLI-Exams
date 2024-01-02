import Player from "./Player.js"
import Fuel from "./Fuel.js"
import Spaceship from "./Spaceship.js"
import Meteor from "./Meteor.js"

//Creacion de la escena
export default class Jetpac extends Phaser.Scene{
    constructor(){
        super({key: 'Jetpac'});
    }
    // Métodos preload, create, update
    
    init(data){
        this.diff = data;
        console.log(data);
    }

    preload(){

        //*************CARGA TILEMAP***************
        // tilemapTiledJSON() -> metodo de Phaser 3.5+ que carga un tilemap en formato
        //      json con un nombre especifico -> en este caso 'map' es el nombre del 
        //      del archivo 'room.json'
        this.load.tilemapTiledJSON('map', './assets/map/tilemap.json')
        // carga el archivo con los patrones para el mapa (solo lo visual)
        this.load.image('mapSprites', './assets/sprites/tileset.png');



        //*************CARGA SPRITES***************
        // carga del sprite del jugador => no hace falta pero aqui esta de chill
        this.load.image('jetPacSprite', './assets/sprites/jetpac.png');

        // carga del spritesheet del personaje principal, con el id para el codigo, 
        // la raiz y las dimensiones de cada frame, para poder dividirlo en los que sea
        this.load.spritesheet('jett', './assets/sprites/jetpac.png', { frameWidth: 17, frameHeight: 24 });
        //cargo fuel 
        this.load.image('fuel', './assets/sprites/fuel.png');
        //spaceship
        this.load.image('spaceship', '/assets/sprites/spaceship.png');
        //meteor
        this.load.spritesheet('meteor', '/assets/sprites/meteor.png', { frameWidth:16, frameHeight:14 });


        //*************CARGA SONIDOS***************
        this.load.audio('pickSound', './assets/sounds/pick.wav');
        this.load.audio('dropSound', './assets/sounds/drop.wav');
        this.load.audio('winSound', './assets/sounds/win.wav');
        this.load.audio('loseSound', './assets/sounds/lose.wav');


        //*************CARGA FUENTE***************
        //this.load.bitmapFont('minecraftFont', './fonts/Minecraftia.ttf');
    }

    create(){
        //----------------TEXTO-----------------
        // const configTexto = {
        //     fontFamily: 'minecraftFont',
        //     fontSize: '48px',
        //     color: '#ffffff',
        //     align: 'center'
        // };
    
        // const textoGanado = this.add.text(400, 300, 'Has ganado', configTexto);
        // textoGanado.setOrigin(0.5);

        

        //----------------------DIFICULTAD-------------------------
        if(this.diff.datos == 'easy')
        {
            this.unidades = 2;
            this.meteorRespawn = 2000;
        }
        else if(this.diff.datos == 'mid')
        {
            this.unidades = 3;
            this.meteorRespawn = 1000;
        }
        else if(this.diff.datos == 'hard')
        {
            this.unidades = 5;
            this.meteorRespawn = 600;
        }



        //----------------------TILEMAP-------------------------
        //configuramos objeto tilemap
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



        //---------------------------- PLAYER ---------------------------------

        // Como 'mummy' es un spritesheet, puede identificar los frames
        // this es Scene
        this.anims.create({
            key: 'jumpingJett',
            frames: this.anims.generateFrameNumbers('jett', { start: 0, end: 5 }),
            frameRate: 2, // Velocidad de la animación
            repeat: -1    // Animación en bucle
        });
        this.anims.create({
            key: 'floatingJett',
            frames: this.anims.generateFrameNumbers('jett', { start: 0, end: 5 }),
            frameRate: 4, // Velocidad de la animación
            repeat: 0    // Animación en bucle
        });

        // crea un objet de tipo player (especificaciones en el player)
        this.playerObj = new Player(this, 20, 20, 'jett');



        //---------------------FUEL-------------------
        //primera instancia
        this.instancioFuel();



        //---------------------SONIDOS-------------------
        this.pickSound = this.sound.add('pickSound');
        this.dropSound = this.sound.add('dropSound');
        this.winSound = this.sound.add('winSound');
        this.loseSound = this.sound.add('loseSound');


        //------------------------SPACESHIP---------------
        this.spaceshipObj = new Spaceship(this, 180, 160, 'spaceship', this.unidades);



        //------------------------METEORS---------------------
        //animaciones
        this.anims.create({
            key: 'metFall',
            frames: this.anims.generateFrameNumbers('meteor', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'metExplode',
            frames: this.anims.generateFrameNumbers('meteor', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: 0 // No se repite, ya que es una animación de un solo ciclo
        });

        //grupo para meteors
        this.meteorGroup = this.add.group();

        //primera instancia
        this.instanciaMeteor(); 
        //timer y resto de instancias
        let timer = this.time.addEvent({
            delay: this.meteorRespawn,
            callback: this.instanciaMeteor,
            callbackScope: this,
            loop: true
        })
        //para dejar de usarlo
        //this.time.removeEvent(timer);


        
        //-----------------------COLISIONES-------------------------
        // activa las colisiones entre los dos objetos marcados, en este caso el player
        // (playerObj) y la capa del suelo (floorLayer)
        // !! en el primer parametro esta .getPlayerSprite() porque, al ser player una clase
        // de tipo container, cuando le llamas no es capaz de llegar al body, que es 
        // lo que se encarga de mirar fisicas y colisones
        //le paso directamente el arcade sprite (this.scene.physics.add.sprite() para que pueda llegar al body.
        // Si se hiciera al player directamente en esta escena y no en una clase a aparte 
        // no haria falta este detalle
        this.physics.add.collider(this.playerObj.getPlayerSprite(), this.floorLayer);
        // mismo pero con fuel ?¿ lo hago en su metodo
        this.physics.add.collider(this.spaceshipObj.getSpaceshipSprite(), this.floorLayer);

        // en la propia capa, decide que bloques tienen collider y cuales no
        // se puede hacer por exclusion con layer.setCollisionByExclusion([93, 94, 95, 96], true);
        //      siendo [93, .... 96] los ids de los bloques que excluir y true que activa las colisiones
        // tambien se pueden hacer por propiedades pero no acabo de entender el metodo:
        //      layer.setCollisionByProperty({ colisiona: true });
        this.floorLayer.setCollisionBetween(1,3);

        // Habilitar colisiones entre el spaceship y el player -> igual esto mejor con overlap
        this.physics.add.collider(this.playerObj.getPlayerSprite(), this.spaceshipObj.getSpaceshipSprite(), this.recargar, null, this);
    
    }
        
    //cuando player choca con fuel
    recogerFuel(){
        this.fuelObj.getFuelSprite().disableBody(true, false);
        this.pickSound.play();
        this.recogido = true;
    }

    recargar(){
        if(this.recogido){ //si tenemos un fuel en la mano
            this.dropSound.play();
            this.fuelObj.getFuelSprite().destroy();
            this.recogido = false;
            this.echarGasolina = true;
            this.unidades--;
        }
    }

    instancioFuel(){
        let randomX = Math.random() * this.game.canvas.width;
        let randomY = Math.random() * this.game.canvas.height;
        this.fuelObj = new Fuel(this, randomX, randomY, 'fuel');

        //Colisiones entre el fuel y el suelo
        this.physics.add.collider(this.fuelObj.getFuelSprite(), this.floorLayer);

        // Habilitar colisiones entre fuel y player
        this.physics.add.collider(this.playerObj.getPlayerSprite(), this.fuelObj.getFuelSprite(), this.recogerFuel, null, this);
    }

    instanciaMeteor(){
        let randomX = Math.random() * this.game.canvas.width;
        this.metObj = new Meteor(this, randomX, 0, 'meteor');
        this.meteorGroup.add(this.metObj);

        // *** OVERLAP *** detecta si dos objetos se superponen SIN provocar colision fisica
        // Phaser.Physics.Arcade.World.overlap(object1, object2, callback);
        this.physics.add.overlap(this.playerObj.getPlayerSprite(), this.metObj.getSprite(), this.lose, null, this);
    }

    win(){
        this.winSound.play();
        this.scene.start('Menu');
    }

    lose(){
        this.loseSound.play();
        this.scene.start('Menu');
    }

    update(){
        //lleva el fuel encima del jugador
        if(this.recogido){
            this.fuelObj.getFuelSprite().x = this.playerObj.getPlayerSprite().x;
            this.fuelObj.getFuelSprite().y = this.playerObj.getPlayerSprite().y - 20;
        }

        //si el numero de unidades es mayor que 0 y e
        if(this.unidades > 0 && this.echarGasolina){
            this.instancioFuel();
            this.echarGasolina = false;
            this.wincond = true;
        }

        else if(this.unidades == 0 && this.wincond){
            this.win();
            this.wincond = false;
        }
    }
}