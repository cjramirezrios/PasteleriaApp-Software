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
  
  // Consultas a la Base de Datos 
  categoriasName: string[] = []
  productos: Producto[] = []

  constructor(private storeService:StoreService, private router: Router, private route: ActivatedRoute) { }

  // Metodos Ciclo de Vida de Angular 
  ngOnInit():void {
    this.categoriasName = this.storeService.categorias.map(e => e.nombre)
    this.productos = this.storeService.productos
    this.categoriaSelecionada = this.storeService.categoriaSelecionada
    if (this.categoriaSelecionada !== ''){
      this.searchByCategoria(this.categoriaSelecionada)
    }
    // this.route.params.subscribe(params => {
    //   const name = params['id'];
    //   this.verifyRoute();
    // });
  }

  ngAfterViewInit(){}

  // Metodos Propios
  detailsOfProduct(item: Producto) {
    this.detailsProducto = item;
    this.showDetalle = true
    console.log(item)
  }

  isLastCategoria(item: string): boolean {
    let last: boolean = false;
    const i: number = this.categoriasName.findIndex(el => el === item);
    last = i === this.categoriasName.length - 1;
    return last
  }

  searchByCategoria(tipo: string) {
    // this.router.navigate(['/store/productos', tipo]) // /store/productos/Pasteles
    this.categoriaSelecionada = tipo;
    let idCategoria = this.storeService.categorias.find(e => e.nombre === tipo)?.id
    let productosByCategoria:Producto[] = this.storeService.productos.filter(e => e.idCategoria === idCategoria)
    this.productos = productosByCategoria
  }

  searchByIdProd(id:number):Producto{
    let prod: Producto = new Producto(1,1,'','',0,'',0,'')
    for (let p of this.storeService.productos){
      if(p.id === id){
        prod = p
      }
    }
    return prod
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

    this.productos = []
    console.log(this.productos)

    let productoSimplificadoArray:ProductoSimplificado[] = []

    for (let p of this.storeService.productos){
      productoSimplificadoArray.push(new ProductoSimplificado(p.id,p.nombre.split(' ')))
    }
    console.log(productoSimplificadoArray)
    for(let p of productoSimplificadoArray){
      for(let nSplit of p.nombreSplit){
        let s:string = nSplit.toLowerCase()
        if(s.includes(this.inputSearchProducto.toLowerCase())){
          this.productos.push(this.searchByIdProd(p.id))
          break
        }
      }
    }
    console.log(this.productos)
  }

  verifyRoute() {
    const rutaActual = this.router.url;
    this.showDetalle = rutaActual !== "/store/productos";
  }

}
