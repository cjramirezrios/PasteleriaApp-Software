import { Pedido, interfaceOrder } from './pedido.model'
import { interfaceUser } from './usuario.model'

export class Cliente {
    id: number
    idUser: number
    nombres: string
    apellidos: string
    direccion: string
    telefono: string
    createdAt: string

    constructor(id: number, idUser: number, nombres: string, apellidos: string,
        direccion: string, telefono: string, createdAt: string) {
        this.id = id
        this.idUser = idUser
        this.nombres = nombres
        this.apellidos = apellidos
        this.direccion = direccion
        this.telefono = telefono
        this.createdAt = createdAt
    }

}

export interface interfaceCustomer {
    id: number,
    name: string,
    lastName: string,
    address: string,
    phone: string,
    createdAt: string,
    userId: number,
    user: interfaceUser,
    pedidos: interfaceOrder[]
}

export class CustomerOrder {
    cliente: Cliente
    pedidos: Pedido[]
    constructor(cliente: Cliente, pedidos: Pedido[]) {
        this.cliente = cliente
        this.pedidos = pedidos
    }
}