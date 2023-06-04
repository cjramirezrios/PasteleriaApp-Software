import { Component } from '@angular/core';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['../producto.component.scss']
})
export class DetalleProductoComponent {
  tab:number = 1; 
  setTab(n:number,id:string){
    this.tab = n;
    console.log(this.tab, id)
  }
}
