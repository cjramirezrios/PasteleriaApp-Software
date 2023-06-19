import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { TokenService } from './auth/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'OnlinePastApp';
  constructor(private authService:AuthService,private tokenService:TokenService){}
  ngOnInit(): void {
    const token=localStorage.getItem('token');
    if(token){
      this.authService.getProfile().subscribe(user=>console.log(user));
    }
  }
}
