import { Customer } from "./customer.model"
import { Pedido } from "./pedido.model"

export interface User{
  id?:number,
  role?:string,
  password:string,
  email:string,
  name?:string,
  lastName?:string,
  customer:Customer
}

export interface AuthUser{
  email?:string,
  password?:string,
  role?:string,
  name?:string,
  lastName?:string,
  token?:string,
  id?:number,
  ok:boolean,
  msg?:string,
  customer?:Customer
}