import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { StoreService } from '../services/store.service';

import { Producto } from '../../models/producto.model'
import { Categoria } from '../../models/categoria.model'

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/auth/models/product.models';
import { Category } from 'src/app/auth/models/category.models';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthToken } from 'src/app/auth/models/token.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  public products!:Product[];
  public categorias!:Category[];
  user!:AuthToken | null;
  bandera:boolean=false;
  constructor(private storeService: StoreService,private fb:FormBuilder,private authService:AuthService, private router: Router, private route: ActivatedRoute) {
    this.authService.user$.subscribe(data=>{
      console.log(data);
      this.user=data;
     })
    }
    
  ngOnInit() {
    this.authService.getProfile().subscribe();
   this.getAllProducts();
   this.getAllCategories();
  }

  addShoppingCart(product:Product){
    this.storeService.addShoppingCart(product);
  }


  getAllProducts(){
    this.storeService.getAllProducts().subscribe(products=>{
      this.products=products;
    })
  }
  getAllCategories(){
    this.storeService.getAllCategories().subscribe(categories=>{
      this.categorias=categories;
    })
  }

  getProductByCategory(id:number){
    this.storeService.getCategoryById(id).subscribe(category=>{
      this.products=category.products;
    });
  }

  redirectDetailProduct(id:number){
    this.router.navigateByUrl(`/store/producto/${id}`);
  }

  redirectEditProduct(id:number){
    this.router.navigateByUrl(`/store/editar-producto/${id}`);
  }
  redirectCreateProduct(){
    this.bandera=!this.bandera;
  }
  deleteProduct(id:number){
    this.storeService.deleteProduct(id).subscribe(resp=>{
      console.log(resp);
    });
    this.ngOnInit();
  }


  imageURL!: string;
  miFormulario:FormGroup=this.fb.group({
    name:['',[Validators.required]],
    description:['',[Validators.required]],
    stock:['',[Validators.required]],
    price:['',[Validators.required]],
    image:['',[Validators.required]],
    categoryId:['',[Validators.required]]
  });

  validarCampo(campo:string){
    const control = this.miFormulario.controls[campo];

    return control && control.errors && control.touched;
  }

  createproduct(){
    const {name,description,stock,image,price,categoryId}=this.miFormulario.value;
    this.storeService.createProduct({name,description,stock,image,price,categoryId}).subscribe(
      resp=>{
        console.log(resp);
      }
    );
    this.redirectCreateProduct();
    this.miFormulario.reset();
  }

}
