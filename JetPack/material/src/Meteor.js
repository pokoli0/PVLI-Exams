export default class Meteor extends Phaser.GameObjects.Container{
    constructor(scene, x, y, key){
        super(scene, x, y);

        this.meteor = this.scene.physics.add.sprite(x, y, 'meteor');
        
        this.meteor.setGravity(0, -100); //quitamos gravedad en el eje y
        //this.meteor.allowGravity = false; //para anular la gravedad

        
        this.angle = Math.random() * 180; //numero aleatorio entre 0 y 180
        this.speed = 50; 

        this.meteor.setVelocity( //velocidad con la direccion del angulo
            this.speed * Math.cos(Phaser.Math.DEG_TO_RAD * this.angle), 
            this.speed * Math.sin(Phaser.Math.DEG_TO_RAD * this.angle));

        this.scene.add.existing(this);
    }

    preUpdate(t, dt){
        //tiroidal
        if(this.meteor.x <= 0){
            this.meteor.x = this.scene.sys.game.canvas.width;
            //this.game.canvas.width //creo q este tb sirve?¿
        }
        else if(this.meteor.x >= this.scene.sys.game.canvas.width){
            this.meteor.x = 0;
        }

        //si se sale por debajo, lo destruimos
        if(this.meteor.y > this.scene.sys.game.canvas.height){
            this.deleteMeteor();
        }
    }

    deleteMeteor(){
        this.meteor.destroy(true); //destruye sprite
        this.destroy(true); //destruye contenedor
    }

    //getter para las colisiones 
    getSprite(){
        return this.meteor;
    }
    
}