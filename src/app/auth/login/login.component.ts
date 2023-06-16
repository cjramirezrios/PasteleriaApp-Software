import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../services/auth.service';

import { Usuario, interfaceAuthUser } from '../../models/usuario.model'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

 //ORIGINAL
export class LoginComponent {
  miFormulario:FormGroup=this.fb.group({
    email:['',[Validators.email,Validators.required]],
    password:['',[Validators.required,Validators.minLength(6)]]
  });
  
  constructor(private fb:FormBuilder,private router:Router,private authService:AuthService){}

  validarCampo(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  login(){
    const {email,password}=this.miFormulario.value;
    this.authService.LoginUser(email,password).subscribe(ok=>{
      if(ok==true){
        this.router.navigateByUrl('/store');
      }else{
        Swal.fire('Error',ok,'error');
      }
    })
  }

  redirectRegistro(){
    this.router.navigateByUrl('/auth/registro')
  }
  redirectStore(){
    this.router.navigateByUrl('/store/main')
  }
}


