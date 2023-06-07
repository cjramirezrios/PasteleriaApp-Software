export class Usuario {
    id: number;
    email: string;
    password: string;
    createdDate: string;
    rol: string;

    constructor(id: number, email: string, password: string,
        createdDate: string, rol: string) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.createdDate = createdDate;
        this.rol = rol;
    }

}