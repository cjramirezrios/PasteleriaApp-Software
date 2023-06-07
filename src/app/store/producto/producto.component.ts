import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { StoreService } from '../services/store.service';

import { Producto } from '../../models/producto.model'
import { Categoria } from '../../models/categoria.model'

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  // Propiedades
  cliente: boolean = true;
  
  inputSearchProducto: string = "";
  
  categoriaSelecionada:string = '';
  detailsProducto: Producto = new Producto(1,1,'','',0,'',0,'');
  showDetalle: boolean = false;
  
  // Propiedades almacenan Respuestas de la Base de Datos 
  categoriasName: string[] = []
  productos: Producto[] = []

  constructor(private storeService:StoreService, private router: Router, private route: ActivatedRoute) { }

  // Metodos Ciclo de Vida de Angular 
  ngOnInit():void {
    //--> METODO SERVICE GetAllCategoriasOnlyName <--
    this.categoriasName = this.storeService.getAllCategoriasOnlyName()
    //--> METODO SERVICE GetAllProductos <--
    this.productos = this.storeService.getAllProducts()
    //--> METODO SERVICE GetCategoria <--
    this.categoriaSelecionada = this.storeService.getCategoria()
    if (this.categoriaSelecionada !== ''){
      this.searchByCategoria(this.categoriaSelecionada)
    }

    /*
    this.route.params.subscribe(params => {
       const name = params['id'];
       const rutaActual = this.router.url;
    });
    */
  }

  ngAfterViewInit(){}

  // Metodos Propios
  detailsOfProduct(item: Producto) {
    this.detailsProducto = item;
    this.showDetalle = true
  }

  isLastCategoria(item: string): boolean {
    let last: boolean = false;
    const i: number = this.categoriasName.findIndex(el => el === item);
    last = i === this.categoriasName.length - 1;
    return last
  }

  searchByCategoria(name: string) {
    /* this.router.navigate(['/store/productos', tipo]) // /store/productos/Pasteles */
    this.categoriaSelecionada = name;
    //--> METODO SERVICE GetCategoriaByName <--
    const idCategoria:number = this.storeService.getCategoriaByName(name)?.id ?? 0
    //--> METODO SERVICE GetProductsByIdCategoria <--
    const productosByCategoria:Producto[] = this.storeService.getProductsByIdCategoria(idCategoria)
    this.productos = productosByCategoria
  }

  searchByIdProd(id:number):Producto{
    //--> METODO SERVICE GetProductById <--
    const producto: Producto = this.storeService.getProductById(id)
    return producto
  }

  searchByNameProd() {
    class ProductoSimplificado {
      id:number;
      nombreSplit:string[];
      constructor(id:number, nombreSplit:string[]){
        this.id = id;
        this.nombreSplit = nombreSplit
      }
    }
    class ProductoId_y_Name {
      id:number;
      nombre:string;
      constructor(id:number, nombre:string){
        this.id = id;
        this.nombre = nombre
      }
    }

    this.productos = []
    this.categoriaSelecionada = ''

    //--> METODO SERVICE GetAllProductsOnlyId&Name <--
    const productos: ProductoId_y_Name[] = this.storeService.getAllProductsOnlyId_y_Name()

    let productoSimplificadoArray:ProductoSimplificado[] = [];
    for (let p of productos){
      productoSimplificadoArray.push(new ProductoSimplificado(p.id,p.nombre.split(' ')))
    }
    for(let p of productoSimplificadoArray){
      for(let nSplit of p.nombreSplit){
        let s:string = nSplit.toLowerCase()
        if(s.includes(this.inputSearchProducto.toLowerCase())){
          this.productos.push(this.searchByIdProd(p.id))
          break
        }
      }
    }
  }

}
