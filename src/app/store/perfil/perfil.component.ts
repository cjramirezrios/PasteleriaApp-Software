import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../services/store.service';

import { Cliente } from '../../models/cliente.model';
import { Usuario, UserCustomer } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

  usuario: Usuario = new Usuario(0,'','','','')
  cliente: Cliente = new Cliente(0,0,'','','','','')

  rastreador:number = 1;

  @ViewChild('datos_personales') idDatosPer!: ElementRef;
  @ViewChild('eliminar_cuenta') idElimCta!: ElementRef;

  constructor(private router:Router,private storeService:StoreService){
    this.tokenValidation()
  }

  //Metodos
  scrollTo(elementId: string) {
    let element: any;
    switch (elementId) {
      case 'datos_personales':
        element = this.idDatosPer.nativeElement;
        element.scrollIntoView({ behavior: 'smooth' });
        this.rastreador = 1;
        break;
      case 'eliminar_cuenta':
        element = this.idElimCta.nativeElement;
        element.scrollIntoView({ behavior: 'smooth' });
        this.rastreador = 2;
        break;
      default:
        break;
    }
  }

  async tokenValidation() {
    try {
      const data = await this.storeService.getUserByToken()
      if (data.usuario.id > 0) {
        this.usuario = data.usuario
        this.cliente = data.cliente
      } else {
        this.router.navigateByUrl('/store/inicio')
      }
    } catch (error) {
      console.log(error)
    }
  }

}
