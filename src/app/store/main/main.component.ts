import { Component, OnInit } from '@angular/core';

import { StoreService } from '../services/store.service';


import { AuthService } from 'src/app/auth/services/auth.service';
import { TokenService } from 'src/app/auth/services/token.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  
  constructor(private storeService: StoreService,private tokenService:TokenService) {}
  ngOnInit(): void {
   
  }

  

}

// export class MainComponent {
  // private apiRoute:string = 'http://localhost:3000/api/category/1';

  // constructor(private http: HttpClient, private storeService: StoreService) {
  //   this.fetchCategoria();
  // }

  // async fetchCategoria() {
  //   this.storeService.getCategoriaById(1)
  //     .then(data => { this.categoria = data })

  //   fetch(this.apiRoute)
  //     .then(res => {
  //       !res.ok ? throw new Error(`Error: ${res.status} ${res.statusText}`): break
  //       return res.json()
  //     })
  //     .then(data => console.log(typeof data, data))
  //     .catch(error => console.error('Error: ', error))

  //   try {
  //     const data = await this.storeService.getCategoriaById(1);
  //     this.categoria = data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
// }
