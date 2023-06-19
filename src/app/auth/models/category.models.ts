import { Product } from "./product.models";

export interface Category{
  id:number,
  name:string,
  description:string,
  image:string,
  products:Product[]
}