import { Usuario } from './usuario.model'
import { Cliente, interfaceCustomer } from './cliente.model'
import { Detalle, interfaceDetail } from './detalle.model'

export class Pedido {
    id: string
    idCliente: number
    createdAt: string
    total: number

    constructor(id: string, idCliente: number, 
        createdAt: string, total: number) {
        this.id = id
        this.idCliente = idCliente
        this.createdAt = createdAt
        this.total = total
    }

}

export interface interfaceOrder {
    id: string,
    customerId: number,
    createdAt: string,
    total: number,
    customer: interfaceCustomer,
    items: interfaceDetail[]
}

export class PedidoFULL {
    pedido: Pedido
    cliente: Cliente
    usuario: Usuario
    items: Detalle[]

    constructor(pedido: Pedido, cliente: Cliente, 
        usuario: Usuario, items: Detalle[]) {
        this.pedido = pedido
        this.cliente = cliente
        this.usuario = usuario
        this.items = items
    }

}