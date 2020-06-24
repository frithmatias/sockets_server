import { Usuario } from "./usuario";

export class UsuariosLista {
    private lista: Usuario[] = [];

    constructor(){}

    public agregar(usuario: Usuario){
        this.lista.push(usuario);
        return usuario;
    }

    public actualizarNombre( id: string, nombre: string){
        for( let usuario of this.lista ) {
            if (usuario.id === id ){
                usuario.nombre = nombre;
                break;
            }
        }
    }

    public getLista() {
        console.log('Solicitud de lista de usuarios', this.lista);
        return this.lista.filter( usuario => usuario.nombre !== 'sin-nombre');
    }

    public getUsuario( id: string ){
        return this.lista.find( usuario => {
            return usuario.id === id;
        });
    }

    public getUsuariosSala (sala: string){
        return this.lista.filter( usuario => {
            return usuario.sala === sala;
        })
    }

    public borrarUsuario(id: string){
        // retengo la data del usuario antes de borrarlo para mostrar un mensaje como ".. fue eliminado"
        const tempUser = this.getUsuario( id ); 
        
        this.lista = this.lista.filter( usuario => {
            return usuario.id !== id;
        })

        return tempUser;
    }
}





