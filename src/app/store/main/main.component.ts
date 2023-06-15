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
  
  constructor(private storeService: StoreService) {}

  ngAfterViewInit() {}

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
