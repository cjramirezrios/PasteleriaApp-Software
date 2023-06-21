import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StoreService } from '../../services/store.service';


import { Customer } from 'src/app/auth/models/customer.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthToken } from 'src/app/auth/models/token.models';
import { switchMap } from 'rxjs';
import { Pedido } from 'src/app/auth/models/pedido.model';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss']
})
export class DetallePedidoComponent implements OnInit{
  customer!:Customer;
  user!:AuthToken | null;
  pedido!:Pedido;
  constructor(private router:Router,private storeService:StoreService,private authService:AuthService,private activateRouter:ActivatedRoute){
    this.authService.user$.subscribe(data=>{
      console.log(data);
      this.user=data;
     })
  }
  ngOnInit(): void {
    if(this.router.url.includes('pedido/editar')){
      this.activateRouter.params.pipe(switchMap(({id})=>this.storeService.getPedidoById(id))).subscribe(pedido=>{
        this.pedido=pedido;
      });
    }
    this.getPedidoByCustomer();
  }

  //Metodos
  
  getPedidoByCustomer(){
    this.authService.getCustomerById(this.user?.customerId!).subscribe(customer=>{
      this.customer=customer;
    })
  }
}
