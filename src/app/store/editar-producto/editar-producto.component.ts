import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { StoreService } from '../services/store.service';
import { Category } from 'src/app/auth/models/category.models';
import { Product } from 'src/app/auth/models/product.models';
import { switchMap } from 'rxjs';
import { TokenService } from 'src/app/auth/services/token.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent implements OnInit{
  imageURL!: string;
  public id!:number;
  public product:Product={
    id:0,
    name:'',
    description:'',
    stock:0,
    image:'',
    price:0,
    categoryId:0
  };
  categorias!:Category[];
  miFormulario:FormGroup=this.fb.group({
    name:["",[Validators.required]],
    description:[``,[Validators.required]],
    stock:["",[Validators.required]],
    price:["",[Validators.required]],
    image:["",[Validators.required,Validators.maxLength(255)]],
    categoryId:["",[Validators.required]]
  });

  validarCampo(campo:string){
    const control = this.miFormulario.controls[campo];
    return control && control.errors && control.touched;
  }
  constructor(private fb:FormBuilder,private activateRouter:ActivatedRoute,private router:Router,private storeService:StoreService,private tokenService:TokenService,private authService:AuthService,private http:HttpClient){}
  ngOnInit(): void {
    this.getAllCategories();
    this.authService.getProfile().subscribe();
    if(this.router.url.includes('editar-producto')){
      this.activateRouter.params.pipe(switchMap(({id})=>this.storeService.getProductById(id))).subscribe(product=>{ 
        console.log(product,'Este es el producto que viene del otro componente');
        this.product=product;
        this.id!=product.id;
        this.miFormulario.patchValue(product)
        console.log(this.product,'Aqui ya se paso la referencia del producto proveniente');
        console.log(this.miFormulario.value,'Valor que tiene el formulario');
      });
    }  
  }

  getAllCategories(){
    this.storeService.getAllCategories().subscribe(categories=>{
      this.categorias=categories;
    })
  }

  modifyProduct(){
    console.log(this.miFormulario.value,'Tratando de actualizar');
    const id=this.id;
    this.storeService.updateProduct(this.product.id!,this.miFormulario.value).subscribe(data=>{
      console.log(data);
      this.router.navigateByUrl('/store/productos');
    });
  }
}
