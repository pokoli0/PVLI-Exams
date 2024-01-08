export default class menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    preload() {
        //----Font----
        // No necesitas cargar la fuente en Phaser porque ya está cargada en el CSS
    }

    create() {

        //Constantes útiles jiji
        const canvasWidth = this.sys.game.config.width;  // Ancho del canvas
        const canvasHeight = this.sys.game.config.height;  // Alto del canvas

        //----------------TITULO------------------
        const titulo = this.add.text(canvasWidth / 2, canvasHeight / 4, 'TwinBee', {  //texto a añadir
            fontFamily: 'gummy',
            fontSize: '40px',
            fill: '#ffffff' 
        });

        // Origen del texto en su centro 
        titulo.setOrigin(0.5, 0.5);

        // Alineación del texto
        titulo.setAlign('center');

        // Font style
        //text.setFont('Arial Black');
        //text.setFontSize(50);

        //Color del reborde de la letra y grosor.
        titulo.setStroke(this.colorAleatorio(), 5)
        //text.setFill('#43d637');
        //text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        //Color de forma aleatoria.



        //---------------BOTONES-----------------
        //Realmente es lo mismo pero usando el método setInteractive

        //this.input.on('pointerup', pointer => {
        //   if (pointer.leftButtonReleased()) {
        //     // se ha soltado el botón izquierdo
        //   }
        // );
        //También hay 'pointerdown', 'wheel', 'gameobjectover'

        //Boton 1
        const button1 = this.add.text(canvasWidth / 2, canvasHeight / 2 + 40, 'One player', {
            fontFamily: 'gummy',
            fontSize: '20px',
            fill: '#00008B'
        });

        button1.setStroke('#FFFF00', 6);  // Color de reborde amarillo
        button1.setOrigin(0.5, 0.5);  // Establece el origen en el centro del texto
        button1.setInteractive({ useHandCursor: true });  // Hace el texto interactivo (useHandCursor es para que el clic cambie, no es obligatorio)
        
        // EVENTO
        button1.on('pointerdown', () => {
            this.playGame(1)
        });

        //Boton 2
        const button2 = this.add.text(canvasWidth / 2, canvasHeight / 2 + 80, 'Two players', {
            fontFamily: 'gummy',
            fontSize: '20px',
            fill: '#ff66b2'
        });

        button2.setStroke('#00008B', 6);  // Color de reborde azul
        button2.setOrigin(0.5, 0.5);  // Establece el origen en el centro del texto
        button2.setInteractive({ useHandCursor: true });  // Hace el texto interactivo (useHandCursor es para que el clic cambie, no es obligatorio)
        
        // EVENTO
        button2.on('pointerdown', () => {
            this.playGame(2);
        });


        //-------TWEEENS-------------
        button1.on('pointerover', () => this.tweenTexto(button1, 1.2));  // Al pasar el cursor, iniciar el tween
        button1.on('pointerout', () => this.tweenTexto(button1, 1));  // Al retirar el cursor, revertir el tween

    }

    tweenTexto(texto, escalaFinal) {
            // Crear un tween para cambiar la escala del texto
            this.tweens.add({
                targets: texto,
                scaleX: escalaFinal,
                scaleY: escalaFinal,
                duration: 100,  // Duración del tween en milisegundos
                ease: 'Linear',  // Función de easing (puedes ajustarla según tus preferencias)
            });
    }

    //EASE: Power1, 

    //Cuando inicias la escena, puedes pasar un array de datos a través del método 
    //this.scene.start desde otra escena. Por ejemplo:
    //this.scene.start('MiEscena', { jugador: 'John', nivel: 5 });
    //Luego en el metodo init(data), los podemos recoger con data. (Ej: data.jugador)
    playGame(n){
        this.scene.start("Level", {nPlayers: n})
    }

    colorAleatorio() {
        const letrasHex = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letrasHex[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}
