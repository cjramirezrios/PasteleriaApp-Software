import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { AuthService } from 'src/app/auth/services/auth.service';

import { Categoria } from '../../models/categoria.model'
import { User } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {
  // Propiedades
  user!: User | null;

  // Propiedades almacenan Respuestas de la Base de Datos
  categorias: Categoria[] = []
  showThis = {general: true, create:false, edit:false, delete:false}

  constructor(private storeService:StoreService, private router: Router, private authService: AuthService){
    this.fetchCategory()
  }

  //Metodo Ciclo de vida de Angular
  ngOnInit(){
    this.authService.user$.subscribe(data => {
      this.user = data;
    })
  }

  //Metodos Propios
  enviarCategoria(id: number){
    this.storeService.sendCategoria(id);
    this.router.navigateByUrl('/store/productos')
  }
  async fetchCategory() {
    try {
      //--> METODO SERVICE GetAllCategorias <--
      this.categorias = await this.storeService.getAllCategorias();
    } catch (error) {
      console.log(error)
    }
  }

  editCategoria(id:number){
    this.storeService.sendCategoria(id);
    this.showThis = {general: false, create:false, edit:true, delete:false}
  }

  deleteCategoria(id:number){
    console.log('')
  }
}
