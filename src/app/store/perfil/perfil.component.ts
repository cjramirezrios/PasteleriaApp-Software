import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../services/store.service';


import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/models/user.model';
import { AuthToken } from 'src/app/auth/models/token.models';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

  user!:AuthToken | null;

  constructor(private router:Router,private storeService:StoreService,private authService:AuthService){
    this.authService.user$.subscribe(data=>{
      console.log(data);
      this.user=data;
     })
  }


}
