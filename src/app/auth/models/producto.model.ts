export interface Producto{
  id:number,
  name:string,
  description:string,
  image:string,
  price:number,
  stock:number
  createdAt:Date,
  categoryId:number
}