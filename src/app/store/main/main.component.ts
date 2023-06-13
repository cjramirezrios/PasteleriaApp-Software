import { Component } from '@angular/core';

import { StoreService } from '../services/store.service';

import { Cliente, CustomerOrder } from 'src/app/models/cliente.model';
import { Usuario, UserCustomer } from 'src/app/models/usuario.model';
import { Pedido, PedidoFULL  } from '../../models/pedido.model'
import { Detalle } from '../../models/detalle.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  // clientes: Cliente[] = [] 
  // usuarios: Usuario[] = []
  pedidos: Pedido[] = []
  detalles: Detalle[] = []
  cliente = new Cliente(0,0,'','','','','')
  usuario = new Usuario(0,'','','','')
  pedido = new Pedido('',0,'',0)
  pedidoFull = new PedidoFULL(this.pedido,this.cliente,this.usuario,this.detalles)
  
  constructor(private storeService: StoreService) {
    // this.loadData();
  }

  ngAfterViewInit() {}

  async loadData() {
    console.log('Hola desde Main Component')
    const id = "2B4F8D7C-1E6A-9B3C-5D6E-7F8A9B0C1D2E"
    try {
      const data = await this.storeService.getOrderById(id);
      this.pedidoFull = new PedidoFULL(data.pedido,data.cliente,data.usuario,data.items)
      for (let i of this.pedidoFull.items) {
        console.log(i.id,i.idPedido,i.idProducto,i.cantidad,i.createdAt)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// export class MainComponent {
  // private apiRoute:string = 'http://localhost:3000/api/category/1';

  // constructor(private http: HttpClient, private storeService: StoreService) {
  //   this.fetchCategoria();
  // }

  // async fetchCategoria() {
  //   this.storeService.getCategoriaById(1)
  //     .then(data => { this.categoria = data })

  //   fetch(this.apiRoute)
  //     .then(res => {
  //       !res.ok ? throw new Error(`Error: ${res.status} ${res.statusText}`): break
  //       return res.json()
  //     })
  //     .then(data => console.log(typeof data, data))
  //     .catch(error => console.error('Error: ', error))

  //   try {
  //     const data = await this.storeService.getCategoriaById(1);
  //     this.categoria = data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
// }
