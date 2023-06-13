import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../services/store.service';

import { Cliente, CustomerOrder } from '../../models/cliente.model';
import { Usuario, UserCustomer } from '../../models/usuario.model';
import { Pedido  } from '../../models/pedido.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent {

  pedidos: Pedido[] = []

  constructor(private router:Router,private storeService:StoreService){
    if (this.storeService.getUserLoggedId() === 0) {
      this.router.navigateByUrl('/store/inicio')
    }else {
      this.storeService.sendPedido('')
      this.fetchOrders(this.storeService.getUserLoggedId())
    }
  }

  //Metodos
  async fetchOrders(id:number) {
    try {
      const {cliente} = await this.storeService.getUserById(id)
      const data = await this.storeService.getCustomerById(cliente.id)
      this.pedidos = data.pedidos
    } catch (error) {
      console.log(error)
    }
  }

  obtenerFecha(date: string):string[]{
    const s1 = date.split('.')
    const fecha_hora = s1[0].split('T')
    return fecha_hora
  }
  navegarDetalle(id:string){
    this.storeService.sendPedido(id)
    this.router.navigateByUrl('/store/pedido/detalle')
  }

}
