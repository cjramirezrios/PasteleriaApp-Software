import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../services/store.service';


import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthToken } from 'src/app/auth/models/token.models';
import { Customer } from 'src/app/auth/models/customer.model';
import { Pedido } from 'src/app/auth/models/pedido.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  user!:AuthToken | null;
  pedidos:Pedido[]=[
    {
      id:'',
      customerId:0,
      total:0
    }
  ];
  customer!:Customer;
  constructor(private router:Router,private storeService:StoreService,private authService:AuthService){
    this.authService.user$.subscribe(data=>{
      console.log(data);
      this.user=data;
      this.getAllPedidos();
      this.getPedidoByCustomer();
     })
  }
  ngOnInit(): void {
  }

  getPedidoByCustomer(){
    this.authService.getCustomerById(this.user?.customerId!).subscribe(customer=>{
      this.customer=customer;
    })
  }

  redirectDetailPedido(id:string){
    this.router.navigateByUrl(`store/pedido/detalle/${id}`);
  }

  getAllPedidos(){
    this.storeService.getAllPedidos().subscribe(pedidos=>{
      console.log(pedidos);
      this.pedidos=pedidos;
    });
  }
  
}
