import {  Cliente, interfaceCustomer } from './cliente.model'

export class Usuario {
    id: number
    email: string
    password: string
    rol: string
    createdAt: string

    constructor(id: number, email: string, password: string,
        rol: string, createdAt: string) {
        this.id = id
        this.email = email
        this.password = password
        this.rol = rol
        this.createdAt = createdAt
    }

}

export interface interfaceUser {
    id: number,
    email: string,
    password: string,
    role: string,
    createAt: string,
    customer: interfaceCustomer
}

export class UserCustomer {
    usuario: Usuario
    cliente: Cliente
    constructor(usuario: Usuario,cliente: Cliente) {
        this.usuario = usuario
        this.cliente = cliente
    }
}