import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../services/store.service';
import { AuthService } from 'src/app/auth/services/auth.service';

import { Cliente } from '../../models/cliente.model';
import { Usuario, UserCustomer } from '../../models/usuario.model';
import { intCarrito } from '../../models/pedido.model';
import { intItemCarrito } from '../../models/detalle.model';
import { User } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {

  user!: User | null;
  carrito: intCarrito = { items: [], total: 0 }

  constructor(private router: Router, private storeService: StoreService, private authService: AuthService) {
    this.tokenValidation()
  }

  //Metodos
  async tokenValidation() {
    try {
      this.authService.user$.subscribe(data => {
        this.user = data;
      })
      if (this.user?.id) {
        if (this.user.role == 'customer') {
          this.getProductos()
          console.log('Estamos en Carrito')
        } else {
          this.router.navigateByUrl('/store/productos')
        }
      } else {
        this.router.navigateByUrl('/store/productos')
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getProductos() {
    try {
      const data = this.storeService.getCarrito()
      if (data.length > 0) {
        for (let i of data) {
          const prod = await this.storeService.getProductById(i[0])
          const item: intItemCarrito = {
            producto: prod,
            cantidad: i[1],
            subtotal: i[1] * prod.precio
          }
          this.carrito.items.push(item)
          this.carrito.total += item.subtotal
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  updateCarrito(){
    let data: number[][] = []
    for (let i of this.carrito.items){
      data.push([i.producto.id,i.cantidad])
    }
    this.storeService.saveCarrito(data)
  }

  plusCantidad(id: number) {
    this.carrito.total = 0
    for (let i=0; i < this.carrito.items.length; i++) {
      if (this.carrito.items[i].producto.id == id) {
        if (this.carrito.items[i].cantidad < this.carrito.items[i].producto.stock) {
          this.carrito.items[i].cantidad += 1
          this.carrito.items[i].subtotal = this.carrito.items[i].producto.precio * this.carrito.items[i].cantidad
        }
      }
      this.carrito.total += this.carrito.items[i].subtotal
    }
    this.updateCarrito()
  }
  minusCantidad(id: number) {
    this.carrito.total = 0
    for (let i=0; i < this.carrito.items.length; i++) {
      if (this.carrito.items[i].producto.id == id) {
        if (this.carrito.items[i].cantidad > 1) {
          this.carrito.items[i].cantidad -= 1
          this.carrito.items[i].subtotal = this.carrito.items[i].producto.precio * this.carrito.items[i].cantidad
        }
      }
      this.carrito.total += this.carrito.items[i].subtotal
    }
    this.updateCarrito()
  }

  deleteItem(id:number){
    // let data:intCarrito = {items: [], total: 0}
    this.carrito.total = 0
    for (let i=0; i < this.carrito.items.length; i++) {
      if (this.carrito.items[i].producto.id == id) {
        this.carrito.items.splice(i,1)
      } else {
        // data.total += data.[i].subtotal
        this.carrito.total += this.carrito.items[i].subtotal
      }
    }
    this.updateCarrito()
  }

  getIndex(id:number):number{
    let indice:number = 0
    for (let i=0; i < this.carrito.items.length; i++) {
      if (this.carrito.items[i].producto.id == id) {
        indice = i + 1
        break
      }
    }
    this.carrito.items
    return indice
  }

  navigateProductos() {
    this.router.navigateByUrl('store/productos')
  }

  navigateMercadoPago() {
    this.router.navigateByUrl('store/carrito')
  }

}
