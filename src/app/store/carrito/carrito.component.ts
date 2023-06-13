import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../services/store.service';


import { Cliente } from '../../models/cliente.model';
import { Usuario, UserCustomer } from '../../models/usuario.model';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {

  // usuario: Usuario = new Usuario(0,'','','','')

  constructor(private router:Router,private storeService:StoreService){
    if (this.storeService.getUserLoggedId() === 0) {
      this.router.navigateByUrl('/store/inicio')
    } else {
      this.fecthUsuario(this.storeService.getUserLoggedId())
    }
  }

  //Metodos
  async fecthUsuario(id:number) {
    try {
      const {usuario} = await this.storeService.getUserById(id)
      // this.usuario = usuario
      if (usuario.rol !== 'customer') {
        this.router.navigateByUrl('/store/inicio')
      }
    } catch (error) {
      console.log(error)
    }
  }

}
