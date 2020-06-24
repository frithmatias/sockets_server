export class Marcador {
    constructor(
        public id: string,
        public nombre: string,
        public lat: number, 
        public lng: number
    ){

    }
}

/* Esta es la manera corta de crear clases, que es lo mismo que usar la forma tradicional:

export class Usuario {
    public id: string;
    public nombre: string;
    public sala: string;
    constructor( id: string ) { 
        this.id = id;
        this.nombre = 'sin-nombre';
        this.sala   = 'sin-sala';
    }
}
*/


