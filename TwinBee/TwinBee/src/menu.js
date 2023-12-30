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

        //Boton 1
        const button1 = this.add.text(canvasWidth / 2, canvasHeight / 2 + 40, 'One player', {
            fontFamily: 'gummy',
            fontSize: '20px',
            fill: '#00008B'
        });

        button1.setStroke('#FFFF00', 6);  // Color de reborde amarillo
        button1.setOrigin(0.5, 0.5);  // Establece el origen en el centro del texto
        button1.setInteractive({ useHandCursor: true });  // Hace el texto interactivo (useHandCursor es para que el clic cambie, no es obligatorio)
        
        // Configurar evento de clic para el botón
        button1.on('pointerdown', () => {
            console.log('Haz clic en el botón');
            // Agrega aquí la lógica que deseas ejecutar al hacer clic en el botón
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
        
        // Configurar evento de clic para el botón
        button2.on('pointerdown', () => {
            console.log('Haz clic en el botón');
            // Agrega aquí la lógica que deseas ejecutar al hacer clic en el botón
        });
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
