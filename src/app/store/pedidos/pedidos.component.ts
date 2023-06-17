import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../services/store.service';
import { AuthService } from 'src/app/auth/services/auth.service';

import { Cliente, CustomerOrder } from '../../models/cliente.model';
import { Usuario, UserCustomer } from '../../models/usuario.model';
import { Pedido } from '../../models/pedido.model';
import { User } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent{

  pedidos: Pedido[] = []
  user!: User | null;
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
        this.storeService.sendPedido('')
        if (this.user.role == 'customer') {
          const usuario:UserCustomer = await this.storeService.getUserById(this.user.id)
          this.fetchOrdersByCustomer(usuario.cliente.id)
        } else {
          this.fetchAllOrders()
        }
      } else {
        this.router.navigateByUrl('/store/inicio')
      }
    } catch (error) {
      console.log(error)
    }
  }
  async fetchOrdersByCustomer(id: number) {
    try {
      const data = await this.storeService.getCustomerById(id)
      this.pedidos = data.pedidos
    } catch (error) {
      console.log(error)
    }
  }
  async fetchAllOrders() {
    try {
      const data = await this.storeService.getAllOrders()
      this.pedidos = data
    } catch (error) {
      console.log(error)
    }
  }

  obtenerFecha(date: string): string[] {
    const s1 = date.split('.')
    const fecha_hora = s1[0].split('T')
    return fecha_hora
  }
  navegarDetalle(id: string) {
    this.storeService.sendPedido(id)
    this.router.navigateByUrl('/store/pedido/detalle')
  }

}
