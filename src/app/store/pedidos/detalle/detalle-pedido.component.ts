import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../../services/store.service';

import { Cliente, CustomerOrder } from '../../../models/cliente.model';
import { Usuario, UserCustomer } from '../../../models/usuario.model';
import { Pedido, PedidoFULL  } from '../../../models/pedido.model';
import { Detalle, DetailProduct  } from '../../../models/detalle.model';
import { Producto  } from '../../../models/producto.model';

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

  constructor(private router:Router,private storeService:StoreService){
    this.tokenValidation()
  }

  //Metodos
  async tokenValidation() {
    try {
      const data = await this.storeService.getUserByToken()
      if (data.usuario.id > 0) {
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
      // for (let item of data.items) {
      //   const prod = await this.storeService.getProductById(item.idProducto)
      //   const detProd = new DetailProduct(item,prod)
      //   this.detailProduct.push(detProd)
      // }
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
