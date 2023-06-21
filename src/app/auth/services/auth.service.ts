import { Injectable } from '@angular/core';
import { lastValueFrom, firstValueFrom, Observable, BehaviorSubject, tap, map, catchError, of, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';


import { AuthUser, User } from '../models/user.model';
import { Customer } from '../models/customer.model';
import { AuthToken } from '../models/token.models';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  //Properties
  private apiRoute: string = environment.apiUrl;
  private _user!:AuthToken;
  private userReactive=new BehaviorSubject<AuthToken | null>(null);
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
    return this.http.post<AuthToken>(`${this.apiRoute}/login`,body).pipe(
      tap(resp=>{
        localStorage.setItem('token',resp.token!);
        this._user={
          id:resp.id,
          email:resp.email,
          token:resp.token,
          name:resp.name,
          lastName:resp.lastName,
          address:resp.address,
          customerId:resp.customerId,
          phone:resp.phone,
          role:resp.role,
          ok:resp.ok
        }
        console.log(this._user)
        this.userReactive.next(this._user);
      }),map(resp=>resp.ok),
      catchError(err=>of(err.error.msg))
    );
  }
  
  getProfile(){
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      console.log('No hay token');
    }
    const headers=new HttpHeaders()
    .set('x-token',token || '').set('Content-Type', 'application/json');;
    return this.http.get<AuthToken>(`${this.apiRoute}/renew`,{headers}).pipe(
      map(resp=>{
          console.log(resp.customerId);
          this.userReactive.next(resp)
          localStorage.setItem('token',resp.token!);
        
      })
    )
  }

  getUserById(id:number):Observable<AuthUser>{
    return this.http.get<AuthUser>(`${this.apiRoute}/user/${id}`);
  }
  LogOut(){
    localStorage.removeItem("token");
  }


  getCustomerById(id:number):Observable<Customer>{
    return this.http.get<Customer>(`${this.apiRoute}/customer/${id}`);
  }
}
