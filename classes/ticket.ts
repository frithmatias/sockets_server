export class Ticket {
	private ticket_id: number = 1;
	private tickets: Tkt[] = [];

	constructor() {}

	// PANTALLA CREAR TICKETS
	public getTicketNum() {
		/*
        ES Espera 
        LL Llamado 
        AT Atendido
        PR Prescrito (cuando es llamado 3 veces)
        */

		const tiket: Tkt = { id_ticket: this.ticket_id, id_desk: 0, status: 'ES' };
		//this.tickets.push(tiket);
		this.tickets[this.ticket_id] = tiket;
		console.log(this.tickets[this.ticket_id]);
		let id_tkt = this.ticket_id; // último ticket
		this.ticket_id++; // próximo ticket a atender
		return {
			id_ticket: id_tkt
		};
	}

	public getAllTickets() {
		let atendidos = [];
		const num = this.tickets.length;
		console.log(this.tickets);
		return this.tickets;
	}

	// PANTALLA ESCRITORIO
	public atenderTicket(id_desk: number) {
		console.log('id_desk', id_desk);
		for (var i = 1; i < this.ticket_id; i++) {
			// primero en espera pasa a llamado
			if (this.tickets[i].status === 'ES') {
				// cliente.broadcast.emit('escuchar-turnos', id);
				const ticket = {
					id_ticket: i,
					id_desk: Number(id_desk),
					status: 'LL'
				};
				this.tickets[i] = ticket;
				console.log('tickets', this.tickets);
				return this.tickets[i];
			}
			// recientemente llamado pasa a atendido
			if (this.tickets[i].status === 'LL' && this.tickets[i].id_desk == id_desk) {
				this.tickets[i].status = 'AT';
			}

			if (i == this.ticket_id) {
				// Se barrio el total de tickets y no hay ninguno en espara 'ES'
				return false;
			}
		}
		console.log(this.tickets);
	}
}

export interface Tkt {
	id_ticket?: number;
	id_desk?: number;
	status?: string;
}
