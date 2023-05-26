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
  dni:number = 32748229;
  password:string = "****************";//"cliente_Pa55w0rd";

  direccion:string = "Av. Los Virreyes #135 Coop. Viña San Francisco";
  mz:string = "B";
  lote:number = 14;
  piso:number = 1;
  referencia:string = "Al costado de la botica Inkafarma";
  distrito:string = "Santa Anita";
  celular:number = 998472663;

  nameOwnerCard:string = "Enrique Aguilar Torres";
  numCard:string = "4252****";
}
