import { Customer } from "./customer.model"
import { Pedido } from "./pedido.model"

export interface User{
  id?:number,
  role?:string,
  password:string,
  email:string,
  customer?:Customer,
  token?:string
}

export interface AuthUser{
  email?:string,
  password?:string,
  role?:string,
  token?:string,
  id?:number,
  ok?:boolean,
  msg?:string,
  customer?:Customer
}