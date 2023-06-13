import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
/* //ORIGINAL
export class RegistroComponent {

  miFormulario:FormGroup=this.fb.group({
    name:['',[Validators.required]],
    lastName:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    address:['',[Validators.required]],
    phone:['',[Validators.required,Validators.minLength(9),Validators.maxLength(9)]],
    password:['',[Validators.required,Validators.minLength(6)]]
  });
  validarNumeroTelefonico(numero: string): boolean {
    const patronTelefono = /^\d{9}$/; 
    return patronTelefono.test(numero);
  }

  validarCampo(campo:string){
    
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }
  constructor(private fb:FormBuilder,private router:Router){}
  registrar(){
    this.router.navigateByUrl('/auth/login');
    this.miFormulario.reset();
  }

}*/

//TEMPORAL
export class RegistroComponent {

  miFormulario:FormGroup=this.fb.group({
    name:['',[Validators.required]],
    lastName:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    address:['',[Validators.required]],
    phone:['',[Validators.required,Validators.minLength(9),Validators.maxLength(9)]],
    password:['',[Validators.required,Validators.minLength(6)]]
  });

  constructor(private fb:FormBuilder,private router:Router,private authService: AuthService){
    if (this.authService.getUserLoggedId() !== 0) {
      this.redirectStore()
    }
  }

  // Metodos
  redirectStore(){
    this.router.navigateByUrl('/store/inicio')
  }

  validarNumeroTelefonico(numero: string): boolean {
    const patronTelefono = /^\d{9}$/; 
    return patronTelefono.test(numero);
  }

  validarCampo(campo:string){
    
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }
  
  registrar(){
    this.router.navigateByUrl('/auth/login');
    this.miFormulario.reset();
  }

}
