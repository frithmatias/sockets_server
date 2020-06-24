import { Socket } from "socket.io";
import SocketIO from "socket.io";
import { UsuariosLista } from "../classes/usuarios-lista";
import { Usuario } from "../classes/usuario";

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket) => {
    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );
}

// Configurar usuario (usuario entra a la sala)
export const configUser = ( cliente: Socket, io: SocketIO.Server ) => {
    cliente.on('configurar-usuario', ( usuario, callback: Function ) => {
        usuariosConectados.actualizarNombre( cliente.id, usuario.nombre);
        // envío a angular la lista actualizada.
        io.emit('usuarios-activos', usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: `Usuario ${ usuario.nombre }, configurado`
        });
    });
}

export const desconectar = ( cliente: Socket , io: SocketIO.Server) => { 
    cliente.on('disconnect', () => {
        const deluser = usuariosConectados.borrarUsuario( cliente.id );
        console.log('Cliente desconectado y eliminado', deluser);
        io.emit('usuarios-activos', usuariosConectados.getLista());
    });
}

// Escuchar mensajes del cliente
export const mensaje = ( cliente: Socket, io: SocketIO.Server ) => {
    cliente.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {
        console.log('Mensaje recibido', payload);
        // io.in(cliente.id).emit('mensaje-nuevo', payload);
        io.emit('mensaje-nuevo', payload);
    });
}

export const mensajePrivado = ( cliente: Socket, io: SocketIO.Server ) => {
    cliente.on('mensaje-privado', ( payload: { de: string, cuerpo: string } ) => {
        console.log('Mensaje Privado recibido', payload);
        // io.in(cliente.id).emit('mensaje-nuevo', payload);
        io.to('id_client').emit('mensaje-nuevo', payload);
    });
}

// Obtener USUARIOS 
export const obtenerUsuarios = ( cliente: Socket, io: SocketIO.Server ) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
        // server.io.in( id ).emit('mensaje-privado', payload);
    });
}





