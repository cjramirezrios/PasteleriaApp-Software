import { Injectable } from '@angular/core';
import { Subject, Observable, lastValueFrom, firstValueFrom, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Categoria, interfaceCategory } from '../../models/categoria.model'
import { Producto, interfaceProduct } from '../../models/producto.model'
import { Usuario, interfaceUser, UserCustomer } from '../../models/usuario.model'
import { Cliente, interfaceCustomer, CustomerOrder } from '../../models/cliente.model'
import { Pedido, interfaceOrder, PedidoFULL } from '../../models/pedido.model'
import { Detalle, DetailProduct } from '../../models/detalle.model';
import { Category } from 'src/app/auth/models/category.models';
import { Product } from 'src/app/auth/models/product.models';
import { AuthPedido } from 'src/app/auth/models/respPedido.models';

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
    return this.http.post<Category>(`${this.apiRoute}/category`,category);
  }

  getCategoryById(id:number):Observable<Category>{
    return this.http.get<Category>(`${this.apiRoute}/category/${id}/`);
  }

  updateCategory(id:number,category:Category):Observable<Category>{
    return this.http.put<Category>(`${this.apiRoute}/category/${id}/`,category);
  }

  deleteCategory(id:number):Observable<Category>{
    return this.http.delete<Category>(`${this.apiRoute}/category/${id}/`);
  }

  //PRODUCTS
  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiRoute}/product`);
  }

  createProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(`${this.apiRoute}/product`,product);
  }

  getProductById(id:number):Observable<Product>{
    return this.http.get<Product>(`${this.apiRoute}/product/${id}/`);
  }

  updateProduct(id:number,product:Product):Observable<Product>{
    return this.http.put<Product>(`${this.apiRoute}/product/${id}/`,product);
  }

  deleteProduct(id:number){
    return this.http.delete(`${this.apiRoute}/product/${id}/`);
  }

  //PEDIDO
  createPedido(data:any):Observable<AuthPedido>{
    return this.http.post<AuthPedido>(`${this.apiRoute}/pedido`,data);
  }


}
