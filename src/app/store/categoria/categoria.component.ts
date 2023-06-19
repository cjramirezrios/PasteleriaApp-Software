import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { Categoria } from '../../models/categoria.model'
import { Category } from 'src/app/auth/models/category.models';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {
  
  categorias!:Category[];
  constructor(private storeService:StoreService, private router: Router){
    
  }

  //Metodo Ciclo de vida de Angular
  ngOnInit(){
    this.getAllCategories();
  }

  //Metodos Propios
    
  getAllCategories(){
    this.storeService.getAllCategories().subscribe(categories=>{
      this.categorias=categories;
    })
  }
}
