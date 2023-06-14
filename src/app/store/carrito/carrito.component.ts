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
    this.tokenValidation()
  }

  //Metodos
  async tokenValidation() {
    try {
      const data = await this.storeService.getUserByToken()
      if (data.usuario.id > 0) {
        if (data.usuario.rol !== 'customer'){
          this.router.navigateByUrl('/store/inicio')
        }
      } else {
        this.router.navigateByUrl('/store/inicio')
      }
    } catch (error) {
      console.log(error)
    }
  }

}
