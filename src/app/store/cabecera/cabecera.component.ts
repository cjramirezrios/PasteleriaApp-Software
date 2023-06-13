import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent {
  logueado:boolean = false;

  constructor(private router:Router,private storeService:StoreService){
    if (this.storeService.getUserLoggedId() !== 0) {
      this.logueado = true
    }
  }


  //Metodos
  setLogueado(b:boolean){
    this.logueado = b;
    this.storeService.removeUserLoggedId()
    this.router.navigateByUrl('/store/inicio')
  }

  redirectLogin(){
    this.router.navigateByUrl('/auth/login');
  }

  redirectRegister(){
    this.router.navigateByUrl('/auth/registro');
  }

  navigateToPerfil(){
    this.router.navigate(['store','perfil']);
  }

  navigateToCarrito(){
    this.router.navigate(['store','carrito']);
  }

}
