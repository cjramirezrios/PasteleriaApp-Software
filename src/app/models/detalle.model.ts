import { Producto } from './producto.model'

export class Detalle {
    id: number
    idPedido: string
    idProducto: number
    createdAt: string
    cantidad: number

    constructor(id: number, idPedido: string, idProducto: number,
        createdAt: string, cantidad: number) {
        this.id = id
        this.idPedido = idPedido
        this.idProducto = idProducto
        this.createdAt = createdAt
        this.cantidad = cantidad
    }

}

export interface interfaceDetail {
    id: number,
    createAt: string,
    amount: number,
    pedidoId: string,
    productId: number
}

export class DetailProduct {
    detalle: Detalle
    producto: Producto
    constructor(detalle: Detalle, producto: Producto) {
        this.detalle = detalle
        this.producto = producto
    }
}
export interface intItemCarrito {
    producto: Producto,
    cantidad: number,
    subtotal: number
}