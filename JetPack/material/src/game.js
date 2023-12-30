import Jetpac from "./Jetpac.js";
import Menu from "./Menu.js";

window.onload = ()=>{

    const config = {
        type: Phaser.AUTO,
        scale: {
            width: 256,
            height: 192,
            zoom: 3,
            autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
        },
        pixelArt: true,
        scene: [ Menu, Jetpac  ],  // Aquí habrá que añadir las escenas

        //IMPORTANTE AÑADIR FISICAS:
        //tb hay tipo "matter" 
        physics: {
            default: "arcade",
            arcade: {
                gravity: {y: 100},
                debug: true, //muestra los cuadraos de colision
                
                // checkCollision:{  
                //     up: true,
                // }

                // ^ esto tiene mas sentido en un objeto en especifico, sería asi:

                //player.body.checkCollision.up = true;
                // -> el objeto será afectado por las colisiones cuando se mueva hacia 
                //arriba y toque otros objetos con los que tenga interacción

                //hay otras propiedades de checkCollision como:
                //.none = true -> Es un atajo para desactivar todas las comprobaciones de colisión.
                //.world = true -> Indica si se deben comprobar las colisiones con el mundo (los bordes del juego). 
                //Si world es true, el objeto colisionará con los límites del juego.
            }
        }
    };

    new Phaser.Game(config);
};