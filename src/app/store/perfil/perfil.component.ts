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
  
  nombre:string = "Enrique";
  apellido:string = "Aguilar Torres";
  correo:string = "enrique.torres@gmail.com";
  password:string = "****************";//"cliente_Pa55w0rd";
  celular:number = 998472663;
  direccion:string = `Av. Los Virreyes #135 Coop. Viña San Francisco
  Mz. B Lt. 14 Piso 1 Santa Anita`;

  usuario: Usuario = new Usuario(0,'','','','')
  cliente: Cliente = new Cliente(0,0,'','','','','')

  rastreador:number = 1;

  @ViewChild('datos_personales') idDatosPer!: ElementRef;
  @ViewChild('eliminar_cuenta') idElimCta!: ElementRef;

  constructor(private router:Router,private storeService:StoreService){
    if (this.storeService.getUserLoggedId() === 0) {
      this.router.navigateByUrl('/store/inicio')
    } else {
      this.fetchCustomer(this.storeService.getUserLoggedId())
    }
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

  async fetchCustomer(id:number){
    try {
      const data = await this.storeService.getUserById(id)
      this.usuario = data.usuario
      this.cliente = data.cliente
    } catch (error) {
      console.log(error)
    }
  }

}
