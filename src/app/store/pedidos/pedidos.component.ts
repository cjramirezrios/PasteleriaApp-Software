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


  constructor(private router:Router,private storeService:StoreService){
   
  }

  
}
