import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { Category } from 'src/app/auth/models/category.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthToken } from 'src/app/auth/models/token.models';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {
  bandera:boolean=false;
  categorias!:Category[];
  user!:AuthToken | null;
  constructor(private storeService:StoreService,private authService:AuthService, private router: Router,private fb:FormBuilder){
    this.authService.user$.subscribe(data=>{
      console.log(data);
      this.user=data;
     })
  }
  imageURL!: string;
  miFormulario:FormGroup=this.fb.group({
    name:['',[Validators.required]],
    description:['',[Validators.required]],
    image:['',[Validators.required]]
  });

  validarCampo(campo:string){
    const control = this.miFormulario.controls[campo];

    return control && control.errors && control.touched;
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

  redirectCreateCategory(){
    this.bandera=!this.bandera;
  }

  redirectEditCategory(id:number){
    this.router.navigateByUrl(`/store/editar-categoria/${id}`);
  }

  deleteCategory(id:number){
    this.storeService.deleteCategory(id).subscribe(resp=>{
      this.ngOnInit();
    }
    );
  }
  createcategory(){
    this.storeService.createCategory(this.miFormulario.value).subscribe(category=>{
      console.log(category);
      this.ngOnInit();
      this.redirectCreateCategory();
      this.miFormulario.reset();
    })
  }
}
