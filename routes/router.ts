import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { Socket } from 'net';
import { usuariosConectados } from '../sockets/sockets';
import { GraficaData } from '../classes/grafica';
import { BarrasData } from '../classes/barras';
import { Mapa } from '../classes/mapa';
import { Ticket } from '../classes/ticket';

const router = Router();
const grafica = new GraficaData();
const barras = new BarrasData();

// ==========================================================
// API 02_GRAFICA_VENTAS_APP
// ==========================================================

router.get('/grafica/ventas', (req: Request, res: Response) => {
    res.json(grafica.getDataGrafica());
});
router.post('/grafica/ventas', (req: Request, res: Response ) => {
    const mes = req.body.mes;
    const unidades = Number(req.body.unidades); 
    grafica.incrementarValor(mes, unidades);
    res.json(grafica.getDataGrafica());
    // Singleton, una misma instancia corriendo en toda la app
    const server = Server.instance; 
    server.io.emit('cambio-data-ventas', grafica.getDataGrafica());
});

// ==========================================================
// API 03_GRAFICA_ENCUESTA_APP
// ==========================================================

router.get('/grafica/encuesta', (req: Request, res: Response) => {
    res.json(barras.getData());
});
router.post('/grafica/encuesta', (req: Request, res: Response ) => {
    const barra = req.body.barra;
    const valor = Number(req.body.valor); // Lo que llega por POST viene como string, lo convierto a numero.
    barras.setData(barra, valor);
    res.json(barras.getData());
    // Singleton, una misma instancia corriendo en toda la app
    const server = Server.instance; 
    server.io.emit('cambio-data-encuesta', barras.getData());
});


// ==========================================================
// API 04_MAPAS_APP
// ==========================================================
export const mapa = new Mapa;

const lugares = [
    { id: '1', nombre: 'Udemy', lat: 37.784679, lng: -122.395936 },
    { id: '2', nombre: 'Bahía de San Francisco', lat: 37.798933, lng: -122.377732 },
    { id: '3', nombre: 'The Palace Hotel', lat: 37.788578, lng: -122.401745 }
];
mapa.marcadores.push(...lugares); //agrego item a item los items de un objeto dentro de un array.

// Obtengo todos los marcadores
router.get('/mapa', (req: Request, res: Response) => {
    res.json(mapa.getMarcadores());
    console.log(mapa.getMarcadores());
});

// ==========================================================
// API 04_TICKETS_APP
// ==========================================================
const ticket = new Ticket();

// PANTALLA CREAR TICKETS
router.get('/nuevoticket', (req: Request, res: Response) => {
	res.json({
		ok: true,
		ticket: ticket.getTicketNum()
	});
});

// PANTALLA ESCRITORIO
router.get('/atenderticket/:desk_id', (req: Request, res: Response) => {
	var desk_id = req.params.desk_id;
	res.json({
		ok: true,
		ticket: ticket.atenderTicket(desk_id)
	});
});

// PANTALLA PUBLICA
router.get('/getalltickets', (req: Request, res: Response) => {
	res.json({
		ok: true,
		tickets: ticket.getAllTickets()
	});
});

export default router;
