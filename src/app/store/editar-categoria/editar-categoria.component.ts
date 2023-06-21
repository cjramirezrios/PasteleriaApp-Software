import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/auth/models/category.models';
import { AuthService } from 'src/app/auth/services/auth.service';
import { StoreService } from '../services/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.scss']
})
export class EditarCategoriaComponent implements OnInit{
  imageURL!: string;
  public id!:number;
  categoria:Category={
    id:0,
    name:'',
    description:'',
    image:'',
    products:[]
  };

  constructor(private fb:FormBuilder,private activateRouter:ActivatedRoute,private router:Router,private storeService:StoreService,private authService:AuthService){}
  ngOnInit(): void {
    if(this.router.url.includes('editar-categoria')){
      this.activateRouter.params.pipe(switchMap(({id})=>this.storeService.getCategoryById(id))).subscribe(categoria=>{ 
        this.categoria=categoria;
        this.id!=categoria.id;
        this.miFormulario.patchValue(categoria)
      });
    }  
  }

  miFormulario:FormGroup=this.fb.group({
    name:["",[Validators.required]],
    description:[``,[Validators.required]],
    image:["",[Validators.required,Validators.maxLength(255)]],
  });

  validarCampo(campo:string){
    const control = this.miFormulario.controls[campo];
    return control && control.errors && control.touched;
  }

  modifyCategory(){
    console.log(this.miFormulario.value,'Tratando de actualizar');
    this.storeService.updateCategory(this.categoria.id!,this.miFormulario.value).subscribe(data=>{
      console.log(data);
      this.router.navigateByUrl('/store/categorias');
    });
  }
}
