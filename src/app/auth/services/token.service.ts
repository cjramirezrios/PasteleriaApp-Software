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
    return this.http.get<AuthUser>(this.apiRoute,{headers}).
    pipe(
      map(resp=>{
        localStorage.setItem('token',resp.token!);
      })
    )
  }
}
