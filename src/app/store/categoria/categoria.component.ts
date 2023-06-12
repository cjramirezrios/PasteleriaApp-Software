import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { Categoria } from '../../models/categoria.model'

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {
  // Propiedades
  cliente:boolean=true;

  // Propiedades almacenan Respuestas de la Base de Datos
  categorias: Categoria[] = []

  constructor(private storeService:StoreService, private router: Router){
    this.fetchCategory()
  }

  //Metodo Ciclo de vida de Angular
  ngOnInit(){}

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

}
