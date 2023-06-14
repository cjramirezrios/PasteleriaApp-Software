import { Injectable } from '@angular/core';
import { lastValueFrom, firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Usuario, interfaceUser, UserCustomer, interfaceAuthUser } from '../../models/usuario.model'
import { Cliente, interfaceCustomer, CustomerOrder } from '../../models/cliente.model'

@Injectable({
  providedIn: 'root'
})
  //ORIGINAL
// export class AuthService {}

//TEMPORAL
export class AuthService {

  //Properties
  private apiRoute: string = environment.apiUrl;
  private token:string = ''

  constructor(private http: HttpClient) {
    this.token = this.getToken()
  }

  // PETICIONES HTTP A LA API | Start -->

  //Metodo GetAllUsers                         SELECT * FROM usuarios
  async getAllUsers(): Promise<UserCustomer[]> {
    let usuarios: UserCustomer[] = [];
    try {
      const data = await firstValueFrom(this.http.get<interfaceUser[]>(this.apiRoute + 'user/'))
      for (let item of data) {
        const usuario = new Usuario(item.id, item.email, item.password, item.role, item.createAt)
        let cliente = new Cliente(0, 0, '', '', '', '', '')
        if (item.role === 'customer') {
          cliente = new Cliente(item.customer.id, item.customer.userId, item.customer.name, item.customer.lastName, item.customer.address, item.customer.phone, item.customer.createdAt)
        }
        const user_client = new UserCustomer(usuario, cliente)
        usuarios.push(user_client)
      }
    } catch (error) {
      console.log(error)
    } finally {
      return usuarios
    }
  }
  //Metodo GetUserByEmail                      SELECT * FROM usuarios WHERE email=email
  async getUserByEmail(email:string): Promise<Usuario> {
    let usuario: Usuario = new Usuario(0,'','','','')
    try {
      const data = await this.getAllUsers()
      for (let item of data) {
        if (item.usuario.email === email) {
          usuario = new Usuario(item.usuario.id, item.usuario.email, item.usuario.password, item.usuario.rol, item.usuario.createdAt)
          break
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      return usuario
    }
  }

  //Metodo GetTokenValidation --> 'x-token'
  async getTokenValidation(): Promise<boolean> {
    let valido:boolean = false
    const headers:HttpHeaders = new HttpHeaders({
      'x-token': `${this.token}`
    })
    try {
      const data = await firstValueFrom(this.http.get<interfaceUser>(this.apiRoute + 'usertoken/',{headers}))
      if (data.id > 0) {
        valido = true
      }
    } catch (error) {
      console.log(error)
    } finally {
      return valido
    }
  }

  //Metodo GetAuthLogin
  async getAuthLogin(email:string,password:string):Promise<interfaceAuthUser>{
    let login:interfaceAuthUser = {ok:false,id:0,name:'',role:'',lastName:'',address:'',phone:'',email:'',token:'',msg:''}
    try {
      const data = await firstValueFrom(this.http.post<interfaceAuthUser>(this.apiRoute + 'login/', {email: email, password: password}))
      login = data
      if (data.ok === true) {
        this.saveToken(data.token)
      }
    } catch (error) {
      console.log(error)
    } finally {
      return login
    }
  }  

  // <-- End | PETICIONES HTTP A LA API

  //Guardar Token en el LocalStorage
  saveToken(token:string) {
    localStorage.setItem('Token', token)
  }
  saveUserLoggedId(id:number) {
    localStorage.setItem('IdUserLogged',id.toString())
  }

  //Obtener Token del LocalStorage
  getToken():string {
    return localStorage.getItem('Token') ?? ''
  }
  getUserLoggedId():number {
    const id:string = localStorage.getItem('IdUserLogged') ?? '0'
    return Number.parseInt(id)
  }

  //Eliminar Token del LocalStorage
  removeToken() {
    localStorage.removeItem('Token')
  }
  removeUserLoggedId() {
    localStorage.removeItem('IdUserLogged')
  }


}
