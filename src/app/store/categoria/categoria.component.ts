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

  constructor(private storeService:StoreService, private router: Router){}

  //Metodo Ciclo de vida de Angular
  ngOnInit(){
    //--> METODO SERVICE GetAllCategorias <--
    this.categorias = this.storeService.getAllCategorias()
  }

  //Metodos Propios
  enviarCategoria(categoria: string){
    this.storeService.sendCategoria(categoria);
    this.router.navigateByUrl('/store/productos')
  }

}
