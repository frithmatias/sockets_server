export class Usuario {
    public id: string;
    public nombre: string; // opcional al momento de conectarse el usuario NO tiene nombre
    public sala: string;


    constructor( id: string ){
        this.id = id;
        this.nombre = 'sin-nombre';
        this.sala = 'sin-sala';
    }
}