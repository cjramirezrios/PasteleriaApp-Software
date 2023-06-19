import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthUser, User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private apiRoute=environment.apiUrl;
  private user=new BehaviorSubject<User | null>(null);
  user$=this.user.asObservable();
  constructor(private http:HttpClient) { }


  reloadToken(){
    const headers=new HttpHeaders()
    .set('x-token',localStorage.getItem('token') || '');
    console.log(headers);
    return this.http.get<User>(`${this.apiRoute}/renew`,{headers}).
    pipe(
      map(resp=>{
        localStorage.setItem('token',resp.token!);
      })
    )
  }

/*
  reloadToken() {
    let headers = new HttpHeaders();
    headers = headers.append('x-token', localStorage.getItem('token') || '');
    console.log(headers);
    
    return this.http.get<AuthUser>(`${this.apiRoute}/renew`, { headers }).pipe(
      map(resp => {
        console.log(resp);
        localStorage.setItem('token', resp.token!);
        return resp.ok;
      })
    );
  }*/
}
