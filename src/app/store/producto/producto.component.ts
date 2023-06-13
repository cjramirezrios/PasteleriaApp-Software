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
  
  categoriaSelecionada:number = 0;
  productoSeleccionado:Producto = new Producto(0,0,'','',0,'',0,'');
  detailsProducto: Producto = new Producto(0,0,'','',0,'',0,'');
  showDetalle: boolean = false;
  
  // Propiedades almacenan Respuestas de la Base de Datos 
  categoriasIdyName: Categoria[] = []
  productos: Producto[] = []

  constructor(private storeService:StoreService, private router: Router, private route: ActivatedRoute) {
    this.fetchCategoryOnlyId_y_Name()
    //--> METODO SERVICE catchCategoria <--
    this.categoriaSelecionada = this.storeService.catchCategoria()
    if (this.categoriaSelecionada !== 0){
      this.searchByCategoria(this.categoriaSelecionada)
    }else{
      this.fetchProduct()
    }

  }

  // Metodos Ciclo de Vida de Angular 
  ngOnInit() {
    /*
    this.route.params.subscribe(params => {
       const name = params['id'];
       const rutaActual = this.router.url;
    });
    */
  }

  ngAfterViewInit(){}

  // Metodos Propios
  async fetchCategoryOnlyId_y_Name() {
    try {
      //--> METODO SERVICE GetAllCategoriasOnlyName <--
      this.categoriasIdyName = await this.storeService.getAllCategoriasOnlyId_y_Name();
    } catch (error) {
      console.log(error)
    }
  }
  async fetchProduct() {
    try {
      //--> METODO SERVICE GetAllProductos <--
      this.productos = await this.storeService.getAllProducts();
    } catch (error) {
      console.log(error)
    }
  }

  detailsOfProduct(producto: Producto) {
    this.detailsProducto = producto;
    this.showDetalle = true
  }

  isLastCategoria(nombre: string): boolean {
    let last: boolean = false;
    const index: number = this.categoriasIdyName.findIndex(e => e.nombre === nombre);
    last = index === this.categoriasIdyName.length - 1;
    return last
  }

  async searchByCategoria(id: number) {
    this.categoriaSelecionada = id;
    //--> METODO SERVICE GetProductsByIdCategoria <--
    const productosByCategoria:Producto[] = await this.storeService.getProductsByIdCategoria(id)
    this.productos = productosByCategoria
  }

  async searchByIdProd(id:number){
    //--> METODO SERVICE GetProductById <--
    this.productoSeleccionado = await this.storeService.getProductById(id)
  }

  async searchByNameProd() {
    class ProductoNameSplit {
      id:number;
      nombreSplit:string[];
      constructor(id:number, nombreSplit:string[]){
        this.id = id;
        this.nombreSplit = nombreSplit
      }
    }

    this.productos = []
    this.categoriaSelecionada = 0

    //--> METODO SERVICE GetAllProductsOnlyId&Name <--
    const productosOnlyIdyName: Producto[] = await this.storeService.getAllProductsOnlyId_y_Name()

    let productosSplitName:ProductoNameSplit[] = [];
    for (let p of productosOnlyIdyName){
      productosSplitName.push(new ProductoNameSplit(p.id,p.nombre.split(' ')))
    }
    for(let p of productosSplitName){
      for(let nSplit of p.nombreSplit){
        let s:string = nSplit.toLowerCase()
        if(s.includes(this.inputSearchProducto.toLowerCase())){
          await this.searchByIdProd(p.id);
          this.productos.push(this.productoSeleccionado)
          break
        }
      }
    }
  }

}
