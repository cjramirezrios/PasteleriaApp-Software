import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent {
  logueado:boolean = true;
  constructor(private router:Router){}

  setLogueado(b:boolean){
    this.logueado = b;
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
