import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../services/store.service';


import { Cliente } from '../../models/cliente.model';
import { Usuario, UserCustomer } from '../../models/usuario.model';
import { Product } from 'src/app/auth/models/product.models';
import { AuthUser, User } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthToken } from 'src/app/auth/models/token.models';
import { InputMerc } from 'src/app/auth/models/inputMerca.models';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit{
  user!:AuthToken | null;
  shoppingCart:Product[]=[];
  total:number=0;
  url_MERP!:String;
  constructor(private router:Router,private authService:AuthService,private storeService:StoreService){
    this.authService.user$.subscribe(data=>{
      console.log(data);
      this.user=data;
     })
  }
  ngOnInit(): void {
    this.storeService.Cart$.subscribe(products=>this.shoppingCart=products);
    this.total=this.storeService.getTotal();
  }

  //Metodos
  removeItem(product:Product){
    this.storeService.removeShoppingCart(product);
    this.total=this.storeService.getTotal();
  }
  
  lessItem(product:Product){
    if(product.select!<=1){
      this.removeItem(product);
    }else{
      product.select!-=1;
    }
    this.total=this.storeService.getTotal();
  }
  addItem(product:Product){
    product.select!+=1;
    this.total=this.storeService.getTotal();
  }

  redirectProducts(){
    this.router.navigateByUrl('/store/productos');
  }
  generateOrder(){
    if(this.user){
      console.log(this.user);
    const{address,phone,name,lastName,customerId}=this.user!;
    const total=this.total;
    let items:InputMerc[]=[];
    console.log(this.shoppingCart);
    this.shoppingCart.forEach((product,index)=>{
      console.log(product);
       const item = {
        id: product.id!,
        title: product.name!,
        unit_price: product.price!,
        quantity: product.select!,
        description: product.description!,
        currency_id: "PEN"
      };
      console.log(item);
      if(item){
        items.push(item);
      }
    })
    const data={
      customerId,
      name,
      lastName,
      phone,
      address,
      total,
      items
    }
    this.storeService.createPedido(data).subscribe(resp=>{
      if (resp && resp.body && resp.body.init_point){
        this.url_MERP=resp.body.init_point;
        window.location.href=String(this.url_MERP);
      }
      localStorage.removeItem('cart');
      this.shoppingCart.splice(0, this.shoppingCart.length);
    })
  }
  }
}
