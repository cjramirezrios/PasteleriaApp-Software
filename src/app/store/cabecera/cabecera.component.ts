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
  logueado: boolean = false;
  usuario: Usuario = new Usuario(0, '', '', '', '')

  constructor(private router: Router, private storeService: StoreService) {
    this.tokenValidation()
  }


  //Metodos
  async tokenValidation() {
    try {
      const data = await this.storeService.getUserByToken()
      if (data.usuario.id > 0) {
        this.logueado = true
        this.usuario = data.usuario
      }
    } catch (error) {
      console.log(error)
    }
  }
  logOut() {
    this.logueado = false;
    this.storeService.removeToken()
    this.storeService.removeCarrito()
    this.router.navigateByUrl('/store/inicio')
  }

  redirectLogin() {
    this.router.navigateByUrl('/auth/login');
  }

  redirectRegister() {
    this.router.navigateByUrl('/auth/registro');
  }

  navigateToPerfil() {
    this.router.navigate(['store', 'perfil']);
  }

  navigateToCarrito() {
    this.router.navigate(['store', 'carrito']);
  }

}
