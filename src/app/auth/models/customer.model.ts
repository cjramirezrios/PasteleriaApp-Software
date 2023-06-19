import { Pedido } from "./pedido.model";

export interface Customer{
  id?:number,
  name?:string,
  lastName?:string,
  phone?:string,
  address?:string,
  userId?:string,
  pedidos?:Pedido[],
  createAt?:Date
}


