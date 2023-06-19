import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StoreService } from '../../services/store.service';

import { Producto } from '../../../models/producto.model'
import { HttpParams } from '@angular/common/http';
import { Product } from 'src/app/auth/models/product.models';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['../producto.component.scss']
})
export class DetalleProductoComponent implements OnInit{

  public product!:Product;
  public id!:number;
  public cant:number=1;
  constructor(private router: Router,private activateRouter:ActivatedRoute, private storeService: StoreService) {
  
  }
  ngOnInit(): void {
    if(this.router.url.includes('producto')){
      this.activateRouter.params.pipe(switchMap(({id})=>this.storeService.getProductById(id))).subscribe(product=>{this.product=product;this.id!=product.id});
    }
  }
  lessCant(){
    this.cant-=1;
    if(this.cant<=1){
      this.cant=1;
    }
  }
  addCant(){
    this.cant+=1;
  }
  //Metodos
}
