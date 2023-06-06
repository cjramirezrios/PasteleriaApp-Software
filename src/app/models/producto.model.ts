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

    getName(): string {
        return this.nombre;
    }
}
