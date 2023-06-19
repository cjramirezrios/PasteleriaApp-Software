import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../services/store.service';

import { Cliente } from '../../models/cliente.model';
import { Usuario, UserCustomer } from '../../models/usuario.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/models/user.model';
import { AuthToken } from 'src/app/auth/models/token.models';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit{
  cont!:number;
  user!:AuthToken | null;
  constructor(private router: Router,private authService:AuthService, private storeService: StoreService) {
  }
  ngOnInit(): void {
    this.authService.user$.subscribe(data=>{
      console.log(data);
      this.user=data;
     });
     this.storeService.Cart$.subscribe(products=>{
      let suma:number=0;
      products.forEach(e=>{
        suma+=e.select!;
      })
      this.cont=suma;
     });
  }


  //Metodos
 
  redirectLogin() {
    this.router.navigateByUrl('/auth/login');
  }

  redirectRegister() {
    this.router.navigateByUrl('/auth/registro');
  }

  navigateToPerfil() {
    if(this.user?.role=='customer'){
      this.router.navigate(['store', 'perfil']);
    }else{
      this.router.navigate(['store']);
    }
  }

  navigateToCarrito() {
    this.router.navigate(['store', 'carrito']);
  }
  
  logOut(){
    this.redirectLogin();
    this.authService.LogOut();  
  }

}
