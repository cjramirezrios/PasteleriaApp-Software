import { Usuario } from './usuario.model'
import { Cliente, interfaceCustomer } from './cliente.model'
import { Detalle, DetailProduct, intItemCarrito } from './detalle.model'
import { Producto, interfaceProduct } from './producto.model'

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
    items: interfaceProduct[]
}

export class PedidoFULL {
    pedido: Pedido
    cliente: Cliente
    usuario: Usuario
    items: DetailProduct[]

    constructor(pedido: Pedido, cliente: Cliente, 
        usuario: Usuario, items: DetailProduct[]) {
        this.pedido = pedido
        this.cliente = cliente
        this.usuario = usuario
        this.items = items
    }

}

export interface intCarrito {
    idCliente?: number,
    items: intItemCarrito[],
    total: number
}