import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss']
})
export class DetallePedidoComponent {

  constructor(private router:Router,private storeService:StoreService){
    if (this.storeService.getUserLoggedId() === 0) {
      this.router.navigateByUrl('/store/inicio')
    }
  }

}
