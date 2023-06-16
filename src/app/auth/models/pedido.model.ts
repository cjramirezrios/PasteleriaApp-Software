import { Producto } from "./producto.model";

export interface Pedido{
  id:string,
  customerId:number,
  createdAt:Date,
  total:number,
  items:Producto[]
}