import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StoreService } from '../../services/store.service';
import { AuthService } from 'src/app/auth/services/auth.service';

import { Producto } from '../../../models/producto.model'
import { Categoria } from '../../../models/categoria.model'
import { User } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['../producto.component.scss']
})
export class DetalleProductoComponent {

  categorias:Categoria[]=[]
  producto: Producto = new Producto(1, 1, '', '', 0, '', 0, '');
  inputCantidad: number = 0
  cantCarrito: number = 0
  user!: User | null;

  formEditProducto:FormGroup=this.fb.group({
    idCategoria:['',[Validators.required]],
    nombre:['',[Validators.required]],
    descripcion:['',[Validators.required]],
    precio:['',[Validators.required]],
    stock:['',[Validators.required]],
    imagen:['',[Validators.required]]
  });

  constructor(private fb:FormBuilder,private router: Router, private storeService: StoreService, private authService: AuthService) {
    this.getProducto()
  }

  // Metodos Ciclo de Vida de Angular 
  ngOnInit() {
    this.authService.user$.subscribe(data => {
      this.user = data;
    })
  }

  //Metodos
  async getProducto() {
    const id = this.storeService.catchProducto()
    try {
      this.producto = await this.storeService.getProductById(id)
      this.categorias = await this.storeService.getAllCategorias()
      let carrito: number[][] = this.storeService.getCarrito()
      if (carrito.length !== 0) {
        for (let i of carrito) {
          if (i[0] === id) {
            this.cantCarrito = i[1]
            break
          }
        }
      }
      if (this.producto.stock - this.cantCarrito > 0) {
        this.inputCantidad = 1
      }
    } catch (error) {
      console.log(error)
    }
  }

  plusCantidad() {
    if (this.inputCantidad < this.producto.stock - this.cantCarrito) {
      this.inputCantidad += 1
    }
  }
  minusCantidad() {
    if (this.inputCantidad > 1) {
      this.inputCantidad -= 1
    }
  }
  addCarrito(id: number, cant: number) {
    if (this.user?.id) {
      if (this.user.role == 'customer') {
        if (cant !== 0) {
          let carrito: number[][] = this.storeService.getCarrito()
          let existe: boolean = false
          if (carrito.length === 0) {
            carrito.push([id, cant])
          } else {
            for (let i = 0; i < carrito.length; i++) {
              if (carrito[i][0] === id) {
                carrito[i][1] += cant
                existe = true
                break
              }
            }
            if (existe === false) {
              carrito.push([id, cant])
            }
          }
          this.storeService.saveCarrito(carrito)
        }
        this.router.navigateByUrl('/store/carrito')
      }
    } else {
      this.router.navigateByUrl('/auth/login')
    }

  }

  updateProducto(){
    const {idCategoria,nombre,descripcion,precio,stock,imagen}=this.formEditProducto.value;
    const prod:Producto = new Producto(this.producto.id,idCategoria,nombre,descripcion,precio,'',stock,imagen)
    this.storeService.putProducto(this.producto.id,prod)
    console.log('Actualizando Producto')
    console.log(idCategoria,nombre,descripcion,precio,stock,imagen)
  }

}
