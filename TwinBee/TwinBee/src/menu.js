export default class menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    preload() {
        //----Font----
        // No necesitas cargar la fuente en Phaser porque ya está cargada en el CSS
    }

    create() {
        // Crear un objeto de texto con la fuente cargada en el CSS
        const Texto = this.add.text(100, 100, 'Hola Mundo', {  //texto a añadir
            fontFamily: 'gummy',
            fontSize: '24px',
            fill: '#ffffff' 
        
        });
    }
}
