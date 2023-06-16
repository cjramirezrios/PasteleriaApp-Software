import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
//ORIGINAL
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
  constructor(private fb:FormBuilder,private router:Router,private authService:AuthService,private http:HttpClient){}
  registrar(){
    const {email,password,...data}=this.miFormulario.value;
    this.authService.createUser(this.miFormulario.value).subscribe(user=>{
      console.log(user);
      this.authService.createCustomer(user.id!,data).subscribe(cliente=>{
        console.log(cliente);
      });
    })
    this.router.navigateByUrl('/auth/login');
    this.miFormulario.reset();
  }

}


