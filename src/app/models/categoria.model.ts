export class Categoria {
    id: number;
    nombre: string;
    descripcion: string;
    createdAt: string;
    imagen: string;

    constructor(id: number, nombre: string, descripcion: string,
        createdAt: string, imagen: string) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.createdAt = createdAt;
        this.imagen = imagen;
    }

    getName(): string {
        return this.nombre;
    }
}
