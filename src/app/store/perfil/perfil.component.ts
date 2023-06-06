import { Component, ViewChild, ElementRef } from '@angular/core';

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

  rastreador:number = 1;

  @ViewChild('datos_personales') idDatosPer!: ElementRef;
  @ViewChild('eliminar_cuenta') idElimCta!: ElementRef;

  constructor(){}

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

}
