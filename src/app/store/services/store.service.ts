import { Injectable } from '@angular/core';
import { Subject, Observable, lastValueFrom, firstValueFrom } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Categoria, interfaceCategory } from '../../models/categoria.model'
import { Producto, interfaceProduct } from '../../models/producto.model'
import { Usuario } from '../../models/usuario.model'

//Clase Temporal para Simular el JSON
class ProductoId_y_Name {
  id:number;
  nombre:string;
  constructor(id:number, nombre:string){
    this.id = id;
    this.nombre = nombre
  }
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  
  //Properties
  private apiRoute:string = environment.apiUrl;
  private categoriaSelecionada:number = 0;
  /*
  // private categoria:Subject<string[]>;
  // categObs = this.categoria.asObservable();
  */

  constructor(private http: HttpClient) {}


// PETICIONES HTTP A LA API | Start -->

  //Metodo GetAllCategorias                    SELECT * FROM categorias
  async getAllCategorias(): Promise<Categoria[]>{
    let categorias: Categoria[] = [];
    try {
      const data = await firstValueFrom(this.http.get<interfaceCategory[]>(this.apiRoute + 'category/'))
      for (let item of data) {
        const categoria = new Categoria(item.id,item.name,item.description,item.createdAt,item.image)
        categorias.push(categoria)
      }
    } catch (error) {
      console.log(error)
    } finally {
      return categorias
    }
  }
  //Metodo GetAllCategoriasOnlyId&Name           SELECT id,nombre FROM categorias 
  async getAllCategoriasOnlyId_y_Name():Promise<Categoria[]> {
    let categorias:Categoria[] = [];
    let categoriasId_y_Name:Categoria[] = [];
    try {
      categorias = await this.getAllCategorias()
      categoriasId_y_Name = categorias.map(e => new Categoria(e.id,e.nombre,'','',''))
    } catch (error) {
      console.log(error)
    } finally {
      return categoriasId_y_Name
    }
  }
  //Metodo GetAllCategoriasOnlyName            SELECT nombre FROM categorias
  async getAllCategoriasOnlyName():Promise<string[]>{
    let categorias:Categoria[] = [];
    let categoriasName:string[] = [];
    try {
      categorias = await this.getAllCategorias()
      categoriasName = categorias.map(e => e.nombre)
    } catch (error) {
      console.log(error)
    } finally {
      return categoriasName
    }
  }
  //Metodo GetCategoriaByName                  SELECT * FROM categorias WHERE nombre=nombre
  async getCategoriaByName(name:string):Promise<Categoria>{
    let categoria:Categoria = new Categoria(0,'','','','')
    try {
      const categorias = await this.getAllCategorias();
      categoria = categorias.find(e => e.nombre === name) ?? new Categoria(0,'','','','')
    } catch (error) {
      console.log(error)
    } finally {
      return categoria
    }
  }
  //Metodo GetCategoriaById                    SELECT * FROM categorias WHERE id=id
  async getCategoriaById(id: number):Promise<Categoria>{
    let categoria!:Categoria;
    try {
      const data = await firstValueFrom(this.http.get<interfaceCategory>(this.apiRoute + 'category/' + id))
      categoria = new Categoria(data.id,data.name,data.description,data.createdAt,data.image)
    } catch (error) {
      console.log(error)
    } finally {
      return categoria
    }
  }

  //Metodo GetAllProductos                     SELECT * FROM productos
  async getAllProducts(): Promise<Producto[]>{
    let productos: Producto[] = [];
    try {
      const data = await firstValueFrom(this.http.get<interfaceProduct[]>(this.apiRoute + 'product/'))
      for (let item of data) {
        const producto = new Producto(item.id,item.categoryId,item.name,item.description,item.price,item.createdAt,item.stock,item.image)
        productos.push(producto)
      }
    } catch (error) {
      console.log(error)
    } finally {
      return productos
    }
  }
  //Metodo GetAllProductsOnlyId&Name           SELECT id,nombre FROM productos 
  async getAllProductsOnlyId_y_Name():Promise<Producto[]> {
    let productos:Producto[] = [];
    let productosId_y_Name:Producto[] = [];
    try {
      productos = await this.getAllProducts()
      productosId_y_Name = productos.map(e => new Producto(e.id,0,e.nombre,'',0,'',0,''))
    } catch (error) {
      console.log(error)
    } finally {
      return productosId_y_Name
    }
  }
  //Metodo GetProductById                      SELECT * FROM productos WHERE idProducto = idProducto
  async getProductById(id:number):Promise<Producto>{
    let producto!:Producto;
    try {
      const data = await firstValueFrom(this.http.get<interfaceProduct>(this.apiRoute + 'product/' + id))
      producto = new Producto(data.id,data.categoryId,data.name,data.description,data.price,data.createdAt,data.stock,data.image)
    } catch (error) {
      console.log(error)
    } finally {
      return producto
    }
  }
  //Metodo GetProductsByIdCategoria            SELECT * FROM productos WHERE idCategoria = idCategoria
  async getProductsByIdCategoria(idCategoria:number):Promise<Producto[]>{
    let productos:Producto[]=[];
    try {
      const data = await firstValueFrom(this.http.get<interfaceCategory>(this.apiRoute + 'category/' + idCategoria))
      for (let item of data.products) {
        const producto = new Producto(item.id,item.categoryId,item.name,item.description,item.price,item.createdAt,item.stock,item.image)
        productos.push(producto)
      }
    } catch (error) {
      console.log(error)
    } finally {
      return productos
    }
  }

  //Metodo GetAllUsuario                       SELECT * FROM usuarios
  getAllUsuario():Usuario[]{
    const usuarios: Usuario[] = [
      new Usuario(1,'','','','admin'),
      new Usuario(2,'','','','admin'),
      new Usuario(3,'','','','cliente'),
      new Usuario(4,'','','','cliente'),
      new Usuario(5,'','','','cliente'),
      new Usuario(6,'','','','cliente'),
      new Usuario(7,'','','','cliente'),
      new Usuario(8,'','','','cliente'),
    ]
    return usuarios
  }
  //Metodo GetAllCliente                       SELECT * FROM clientes

// <-- End | PETICIONES HTTP A LA API


  //Metodos Enviar Datos - Comunicacion entre Componentes
  sendCategoria(id:number){
    this.categoriaSelecionada = id;
  }

  //Metodos Obtener Datos - Comunicacion entre Componentes
  catchCategoria():number{
    return this.categoriaSelecionada
  }

}
