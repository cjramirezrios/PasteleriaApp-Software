import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  miFormulario:FormGroup=this.fb.group({
    email:['',[Validators.email,Validators.required]],
    password:['',[Validators.required,Validators.minLength(6)]]
  });
  
  constructor(private fb:FormBuilder,private router:Router){}
  validarCampo(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  redirectRegistro(){
    this.router.navigateByUrl('/auth/registro')
  }
}
