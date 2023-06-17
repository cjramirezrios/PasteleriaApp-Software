import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../../services/store.service';
import { AuthService } from 'src/app/auth/services/auth.service';

import { Cliente, CustomerOrder } from '../../../models/cliente.model';
import { Usuario, UserCustomer } from '../../../models/usuario.model';
import { Pedido, PedidoFULL  } from '../../../models/pedido.model';
import { Detalle, DetailProduct  } from '../../../models/detalle.model';
import { Producto  } from '../../../models/producto.model';
import { User } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss']
})
export class DetallePedidoComponent {

  usuario: Usuario = new Usuario(0,'','','','')
  cliente: Cliente = new Cliente(0,0,'','','','','')
  pedido: Pedido = new Pedido('',0,'',0)
  detailProduct: DetailProduct[] = []
  user!: User | null;

  constructor(private router:Router,private storeService:StoreService,private authService: AuthService){
    this.tokenValidation()
  }

  //Metodos
  async tokenValidation() {
    try {
      this.authService.user$.subscribe(data => {
        this.user = data;
      })
      if (this.user?.id) {
        if (this.storeService.catchPedido() === '') {
          this.router.navigateByUrl('/store/pedido')
        } else {
          this.fetchDetail()
        }
      } else {
        this.router.navigateByUrl('/store/inicio')
      }
    } catch (error) {
      console.log(error)
    }
  }
  async fetchDetail() {
    try {
      const id = this.storeService.catchPedido()
      const data = await this.storeService.getOrderById(id)
      this.usuario = data.usuario
      this.cliente = data.cliente
      this.pedido = data.pedido
      this.detailProduct = data.items
    } catch (error) {
      console.log(error)
    }
  }
  obtenerFecha(date: string):string[]{
    const s1 = date.split('.')
    const fecha_hora = s1[0].split('T')
    return fecha_hora
  }
  /*
  obtenerFecha(date: string):string[]{
    const s1:string[] = date.split('.')
    const s2:string[] = s1[0].split('T')
    const s3:string[] = s2[1].split(':',2)
    const fecha_hora = [s2[0],`${s3[0]}:${s3[1]}`]
    return fecha_hora
  }*/

}
