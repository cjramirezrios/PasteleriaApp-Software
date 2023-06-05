import { Component } from '@angular/core';

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
}
