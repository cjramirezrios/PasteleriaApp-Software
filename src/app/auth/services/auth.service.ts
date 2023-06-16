import { Injectable } from '@angular/core';
import { lastValueFrom, firstValueFrom, Observable, BehaviorSubject, tap, map, catchError, of, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Usuario, interfaceUser, UserCustomer, interfaceAuthUser } from '../../models/usuario.model'
import { Cliente, interfaceCustomer, CustomerOrder } from '../../models/cliente.model'
import { AuthUser, User } from '../models/user.model';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  //Properties
  private apiRoute: string = environment.apiUrl;
  private _user!:User;
  private userReactive=new BehaviorSubject<User | null>(null);
  user$=this.userReactive.asObservable();
  get user(){
    return {...this._user};
  }
  constructor(private http: HttpClient) {}

  createUser(data:User):Observable<User>{
    const {email,password,...dat}=data;
    return this.http.post<User>(`${this.apiRoute}/user`,{email,password});
    
  }

  createCustomer(id:number,data:Customer):Observable<Customer>{
    const{name,lastName,address,phone}=data;
    return this.http.post<Customer>(`${this.apiRoute}/customer`,{userId:id,name,lastName,address,phone});
  }


  LoginUser(email:string,password:string){
    const body={email,password}
    return this.http.post<AuthUser>(`${this.apiRoute}/login`,body).pipe(
      tap(resp=>{
        localStorage.setItem('token',resp.token!);
        this._user={
          id:resp.id!,
          email:resp.email!,
          password:resp.password!,
          customer:resp.customer!
        }
        this.userReactive.next(this._user);
      }),map(resp=>resp.ok),
      catchError(err=>of(err.error.msg))
    );
  }
  
  getProfile(){
    const headers=new HttpHeaders()
    .set('x-token',localStorage.getItem('token') || '');
    return this.http.get<User>(`${this.apiRoute}/renew`,{headers}).pipe(
      tap(user=>this.userReactive.next(user))
    )
  }
  LogOut(){
    localStorage.removeItem("token");
  }


}
