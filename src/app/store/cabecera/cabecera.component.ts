import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent {

  constructor(private router:Router){}
  redirectLogin(){
    this.router.navigateByUrl('/auth/login');
  }

  redirectRegister(){
    this.router.navigateByUrl('/auth/registro');
  }

}
