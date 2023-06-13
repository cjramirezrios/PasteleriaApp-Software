import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { StoreService } from '../../store/services/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/* //ORIGINAL
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
  redirectStore(){
    this.router.navigateByUrl('/store/main')
  }
}*/

//TEMPORAL
export class LoginComponent {
  inputEmail: string = ''
  inputPassword: string = '' 
  campoIncorrecto: boolean = false

  miFormulario:FormGroup=this.fb.group({
    email:['',[Validators.email,Validators.required]],
    password:['',[Validators.required,Validators.minLength(6)]]
  });
  
  constructor(private fb:FormBuilder,private router:Router,
    private authService: AuthService,private storeService:StoreService){
    if (this.authService.getUserLoggedId() !== 0) {
      this.redirectStore()
    }
  }

  validarCampo(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  redirectRegistro(){
    this.router.navigateByUrl('/auth/registro')
  }
  redirectStore(){
    this.router.navigateByUrl('/store/inicio')
  }

  async validarUsuario() {
    try {
      //--> METODO SERVICE GetUserByEmail <--
      const usuario = await this.authService.getUserByEmail(this.inputEmail)
      if (usuario.id !== 0) {
        if (usuario.password === this.inputPassword) {
          this.storeService.sendUserLogged(usuario.id) //Usando StoreService
          this.authService.saveUserLoggedId(usuario.id) //Usando LocalStorage
          this.redirectStore()
        } else {
          this.campoIncorrecto = true
        }
      } else {
        this.campoIncorrecto = true
      }
    } catch (error) {
      console.log(error)
    }
  }

}
