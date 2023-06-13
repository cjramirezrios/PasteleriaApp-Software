import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../../services/store.service';

import { Producto } from '../../../models/producto.model'

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['../producto.component.scss']
})
export class DetalleProductoComponent {
  
  detalle: Producto = new Producto(1, 1, '', '', 0, '', 0, '');
  inputCantidad: number = 0
  cantCarrito:number = 0

  constructor(private router: Router, private storeService: StoreService) {
    this.getProducto()
  }

  //Metodos
  async getProducto() {
    const id = this.storeService.catchProducto()
    try {
      this.detalle = await this.storeService.getProductById(id)
      let carrito:any[][] = this.storeService.getCarrito()
      if (carrito.length !== 0) {
        for (let i of carrito) {
          if (i[0] === id) {
            this.cantCarrito = i[1]
            break
          }
        }
      }
      if (this.detalle.stock - this.cantCarrito > 0) {
        this.inputCantidad = 1
      }
    } catch (error) {
      console.log(error)
    }
  }

  plusCantidad() {
    if (this.inputCantidad < this.detalle.stock - this.cantCarrito) {
      this.inputCantidad += 1
    }
  }
  minusCantidad() {
    if (this.inputCantidad > 0) {
      this.inputCantidad -= 1
    }
  }
  addCarrito(id: number, cant: number) {
    if (cant !== 0){
      let carrito:any[][] = this.storeService.getCarrito()
      let existe:boolean = false
      if (carrito.length === 0) {
        carrito.push([id,cant])
      } else {
        for (let i=0; i < carrito.length; i++) {
          if (carrito[i][0] === id) {
            carrito[i][1] += cant
            existe = true
            break
          }
        }
        if (existe === false) {
          carrito.push([id,cant])
        }
      }
      this.storeService.saveCarrito(carrito)
    }
    this.router.navigateByUrl('/store/carrito')
  }

}
