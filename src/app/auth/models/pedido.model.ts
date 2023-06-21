import { Customer } from "./customer.model";
import { Producto } from "./producto.model";

export interface Pedido{
  id:string,
  customerId:number,
  createdAt?:Date,
  total:number,
  customer?:Customer,
  items?:Producto[]
}