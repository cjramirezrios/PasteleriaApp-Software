import { interfaceCategory } from './categoria.model'
import { interfaceDetail } from './detalle.model'

export class Producto {
    id: number;
    idCategoria: number;
    nombre: string;
    descripcion: string;
    precio: number;
    createdAt: string;
    stock: number;
    imagen: string;

    constructor(id: number, idCategoria: number, nombre: string, descripcion: string,
        precio: number, createdAt: string, stock: number, imagen: string) {
        this.id = id;
        this.idCategoria = idCategoria;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.createdAt = createdAt;
        this.stock = stock;
        this.imagen = imagen;
    }
}

export interface interfaceProduct {
    id: number,
    name: string,
    image: string,
    description: string,
    price: number,
    stock: number,
    createdAt: string,
    categoryId: number,
    category: interfaceCategory,
    PedidoProductos: interfaceDetail
}