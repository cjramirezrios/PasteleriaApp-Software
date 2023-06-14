import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

import { Usuario, interfaceAuthUser } from '../../models/usuario.model'


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

  miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.tokenValidation()
  }

  validarCampo(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  redirectRegistro() {
    this.router.navigateByUrl('/auth/registro')
  }
  redirectStore() {
    this.router.navigateByUrl('/store/inicio')
  }
  async tokenValidation() {
    try {
      const valido = await this.authService.getTokenValidation()
      if (valido) {
        this.redirectStore()
      }
    } catch (error) {
      console.log(error)
    }
  }

  async login() {
    try {
      const login = await this.authService.getAuthLogin(this.inputEmail, this.inputPassword)
      if (login.ok === true) {
        this.redirectStore()
      } else {
        this.campoIncorrecto = true
      }
    } catch (error) {
      console.log(error)
    }
  }
  /*
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
    }*/

}
