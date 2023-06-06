import { Component, Input } from '@angular/core';

import { Producto } from '../../../models/producto.model'

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['../producto.component.scss']
})
export class DetalleProductoComponent {
  tab:number = 1; 
  @Input() detalle: Producto = new Producto(1,1,'','',0,'',0,'');
  
  setTab(n:number,id:string){
    this.tab = n;
    console.log(this.tab, id)
  }
}
