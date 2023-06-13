import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../services/store.service';

import { Cliente } from '../../models/cliente.model';
import { Usuario, UserCustomer } from '../../models/usuario.model';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent {
  logueado:boolean = false;
  usuario: Usuario = new Usuario(0,'','','','')

  constructor(private router:Router,private storeService:StoreService){
    if (this.storeService.getUserLoggedId() !== 0) {
      this.logueado = true
      this.fecthUsuario(this.storeService.getUserLoggedId())
    }
  }


  //Metodos
  async fecthUsuario(id:number) {
    try {
      const {usuario} = await this.storeService.getUserById(id)
      this.usuario = usuario
    } catch (error) {
      console.log(error)
    }
  }
  logOut(b:boolean){
    this.logueado = b;
    this.storeService.removeUserLoggedId()
    this.storeService.removeCarrito()
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
