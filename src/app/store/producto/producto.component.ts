import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { StoreService } from '../services/store.service';

import { Producto } from '../../models/producto.model'

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
  
  inputSearchValue: string = "";
  
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
    //metodo para mostrar productos segun categoria
    console.log('Aqui iria el algoritmo para buscar por categoria: ' + tipo)
  }

  searchByNameProd() {
    for (let item of this.productos){
      if (item.nombre === this.inputSearchValue) {
        this.detailsProducto = item;
        this.showDetalle = true
        console.log(this.inputSearchValue)
      }
    }
  }

  verifyRoute() {
    const rutaActual = this.router.url;
    this.showDetalle = rutaActual !== "/store/productos";
  }

}
