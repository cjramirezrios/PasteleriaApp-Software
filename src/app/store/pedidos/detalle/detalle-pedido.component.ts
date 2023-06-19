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


  constructor(private router:Router,private storeService:StoreService){
   
  }

  //Metodos
  

}
