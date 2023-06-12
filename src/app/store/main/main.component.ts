import { Component } from '@angular/core';

import { StoreService } from '../services/store.service';
import { Categoria } from '../../models/categoria.model'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  categoria: Categoria = new Categoria(0, '', '', '', '');

  constructor(private storeService: StoreService) {
    this.loadData();
  }

  ngAfterViewInit() {}

  async loadData() {
    console.log('Hola desde Main Component')
    try {
      const data = await this.storeService.getCategoriaById(1);
      console.log("Data: " + data)
      console.log(data.id, data.nombre, data.descripcion, data.createdAt, data.imagen)
      this.categoria = data
      console.log("Categoria After: " + this.categoria)

    } catch (error) {
      console.log(error)
    }
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
