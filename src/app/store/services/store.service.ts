import { Injectable } from '@angular/core';
import { Subject, Observable, lastValueFrom, firstValueFrom, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

import { environment } from '../../../environments/environment';


import { Category } from 'src/app/auth/models/category.models';
import { Product } from 'src/app/auth/models/product.models';
import { AuthPedido } from 'src/app/auth/models/respPedido.models';
import { ReturnStatement } from '@angular/compiler';
import { Pedido } from 'src/app/auth/models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiRoute: string = environment.apiUrl;
  private ShoppingCart:Product[]=[];
  private Cart= new BehaviorSubject<Product[]>([]);
  Cart$=this.Cart.asObservable();
  get ShoppingAddCart(){
    return this.ShoppingCart;
  }


  constructor(private http: HttpClient) {
    const savedCart = localStorage.getItem('cart');
    this.ShoppingCart = savedCart ? JSON.parse(savedCart) : [];
    this.Cart.next(this.ShoppingCart);
  }

  //CARRITO
  addShoppingCart(product:Product){
    const existingProduct = this.ShoppingCart.find(prod => prod.id === product.id);
  if (existingProduct) {
    existingProduct.select! += 1;
  } else {
    product.select = 1;
    this.ShoppingCart.push(product);
  }
  this.saveCartToLocalStorage(); // Guardar en el localStorage
  this.Cart.next(this.ShoppingCart);
  }
  removeShoppingCart(product:Product){
    const existingProduct = this.ShoppingCart.find(prod => prod.id === product.id);
    if (existingProduct) {
      if (existingProduct.select && existingProduct.select > 1) {
        existingProduct.select -= 1;
      } else {
        const index = this.ShoppingCart.indexOf(existingProduct);
        this.ShoppingCart.splice(index, 1);
      }
      this.saveCartToLocalStorage(); // Guardar en el localStorage
    }
    this.Cart.next(this.ShoppingCart);
  }
  saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.ShoppingCart));
  }
  getTotal(){
    return this.ShoppingCart.reduce((suma,item)=>suma+item.price*item.select!,0);
  }

  

  //CATEGORIES
  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${this.apiRoute}/category`);
  }

  createCategory(category:Category):Observable<Category>{
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')
    .set('Content-Type', 'application/json');
    return this.http.post<Category>(`${this.apiRoute}/category`,category,{headers});
  }

  getCategoryById(id:number):Observable<Category>{
    return this.http.get<Category>(`${this.apiRoute}/category/${id}`);
  }

  updateCategory(id:number,category:Category):Observable<Category>{
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')
    .set('Content-Type', 'application/json');
    return this.http.put<Category>(`${this.apiRoute}/category/${id}`,category,{headers});
  }

  deleteCategory(id:number):Observable<Category>{
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')
    .set('Content-Type', 'application/json');
    return this.http.delete<Category>(`${this.apiRoute}/category/${id}/`,{headers});
  }

  //PRODUCTS
  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiRoute}/product`);
  }

  createProduct(product:Product):Observable<Product>{
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')
    .set('Content-Type', 'application/json');
    return this.http.post<Product>(`${this.apiRoute}/product`,product,{headers});
  }

  getProductById(id:number):Observable<Product>{
    return this.http.get<Product>(`${this.apiRoute}/product/${id}`);
  }

  updateProduct(id:number,product:Product):Observable<Product>{
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')
    .set('Content-Type', 'application/json');
    return this.http.put<Product>(`${this.apiRoute}/product/${id}`,product,{headers});
  }

  deleteProduct(id:number){
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')
    .set('Content-Type', 'application/json');
    return this.http.delete(`${this.apiRoute}/product/${id}`,{headers});
  }

  //PEDIDO
  createPedido(data:any):Observable<AuthPedido>{
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')
    .set('Content-Type', 'application/json');
    return this.http.post<AuthPedido>(`${this.apiRoute}/pedido`,data,{headers});
  }

  getAllPedidos():Observable<Pedido[]>{
    return this.http.get<Pedido[]>(`${this.apiRoute}/pedido`);
  }

  getPedidoById(id:string):Observable<Pedido>{
    return this.http.get<Pedido>(`${this.apiRoute}/pedido/${id}`)
  }

  updatePedido(id:string,data:Pedido):Observable<Pedido>{
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')
    .set('Content-Type', 'application/json');
    return this.http.put<Pedido>(`${this.apiRoute}/pedido/${id}`,data,{headers});
  }

  deletePedido(id:string){
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')
    .set('Content-Type', 'application/json');
    return this.http.delete(`${this.apiRoute}/pedido/${id}`,{headers});
  }
}
