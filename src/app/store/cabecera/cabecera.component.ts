import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../services/store.service';

import { Cliente } from '../../models/cliente.model';
import { Usuario, UserCustomer } from '../../models/usuario.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit{

  user!:User | null;
  constructor(private router: Router,private authService:AuthService, private storeService: StoreService) {
  }
  ngOnInit(): void {
    this.authService.user$.subscribe(data=>{
      console.log(data);
      this.user=data;
     })
  }


  //Metodos
  /*async tokenValidation() {
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
  }*/

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
  
  logOut(){
    this.redirectLogin();
    this.authService.LogOut();  
  }

}
