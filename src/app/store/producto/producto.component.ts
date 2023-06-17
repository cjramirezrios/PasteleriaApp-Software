import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { StoreService } from '../services/store.service';
import { AuthService } from 'src/app/auth/services/auth.service';

import { Producto } from '../../models/producto.model'
import { Categoria } from '../../models/categoria.model'
import { User } from 'src/app/auth/models/user.model';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  // Propiedades
  inputSearchProducto: string = "";

  categoriaSelecionada: number = 0;
  productoSeleccionado: Producto = new Producto(0, 0, '', '', 0, '', 0, '');
  detailsProducto: Producto = new Producto(0, 0, '', '', 0, '', 0, '');
  showDetalle: boolean = false;
  
  user!: User | null;

  // Propiedades almacenan Respuestas de la Base de Datos 
  categoriasIdyName: Categoria[] = []
  productos: Producto[] = []

  constructor(private storeService: StoreService, private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    this.fetchCategoryOnlyId_y_Name()
    this.categoriaSelecionada = this.storeService.catchCategoria()
    if (this.categoriaSelecionada !== 0) {
      this.searchByCategoria(this.categoriaSelecionada)
    } else {
      this.fetchProduct()
    }

  }

  // Metodos Ciclo de Vida de Angular 
  ngOnInit() {
    this.authService.user$.subscribe(data => {
      this.user = data;
    })
  }

  ngAfterViewInit() { }

  // Metodos Propios
  async fetchCategoryOnlyId_y_Name() {
    try {
      this.categoriasIdyName = await this.storeService.getAllCategoriasOnlyId_y_Name();
    } catch (error) {
      console.log(error)
    }
  }
  async fetchProduct() {
    try {
      this.productos = await this.storeService.getAllProducts();
    } catch (error) {
      console.log(error)
    }
  }

  isLastCategoria(nombre: string): boolean {
    let last: boolean = false;
    const index: number = this.categoriasIdyName.findIndex(e => e.nombre === nombre);
    last = index === this.categoriasIdyName.length - 1;
    return last
  }

  async searchByCategoria(id: number) {
    this.categoriaSelecionada = id;
    try {
      const productosByCategoria: Producto[] = await this.storeService.getProductsByIdCategoria(id)
      this.productos = productosByCategoria
    } catch (error) {
      console.log(error)
    }
  }

  async searchByIdProd(id: number) {
    try {
      this.productoSeleccionado = await this.storeService.getProductById(id)
    } catch (error) {
      console.log(error)
    }
  }

  async searchByNameProd() {
    class ProductoNameSplit {
      id: number;
      nombreSplit: string[];
      constructor(id: number, nombreSplit: string[]) {
        this.id = id;
        this.nombreSplit = nombreSplit
      }
    }

    this.productos = []
    this.categoriaSelecionada = 0

    try {
      const productosOnlyIdyName: Producto[] = await this.storeService.getAllProductsOnlyId_y_Name()

      let productosSplitName: ProductoNameSplit[] = [];
      for (let p of productosOnlyIdyName) {
        productosSplitName.push(new ProductoNameSplit(p.id, p.nombre.split(' ')))
      }
      for (let p of productosSplitName) {
        for (let nSplit of p.nombreSplit) {
          let s: string = nSplit.toLowerCase()
          if (s.includes(this.inputSearchProducto.toLowerCase())) {
            await this.searchByIdProd(p.id);
            this.productos.push(this.productoSeleccionado)
            break
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  detailsOfProduct(id: number) {
    this.storeService.sendProducto(id);
    this.showDetalle = true
  }

  async addToCarrito(id: number) {
    try {
      if (this.user?.id) {
        if (this.user.role == 'customer') {
          const data = await this.storeService.getProductById(id)
          let carrito: number[][] = this.storeService.getCarrito()
          let cantCarrito = 0
          if (carrito.length !== 0) {
            for (let i of carrito) {
              if (i[0] === id) {
                cantCarrito = i[1]
                break
              }
            }
          }
          let existe: boolean = false
          if (data.stock - cantCarrito > 0) {
            if (carrito.length === 0) {
              carrito.push([id, 1])
            } else {
              for (let i = 0; i < carrito.length; i++) {
                if (carrito[i][0] === id) {
                  carrito[i][1] += 1
                  existe = true
                  break
                }
              }
              if (existe === false) {
                carrito.push([id, 1])
              }
            }
            this.storeService.saveCarrito(carrito)
          }
          this.router.navigateByUrl('/store/carrito')
        }
      } else {
        this.router.navigateByUrl('/auth/login')
      }

    } catch (error) {
      console.log(error)
    }
  }

}
