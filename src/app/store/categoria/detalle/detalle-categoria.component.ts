import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { StoreService } from '../../services/store.service';
import { AuthService } from 'src/app/auth/services/auth.service';

import { Categoria } from '../../../models/categoria.model'
import { User } from 'src/app/auth/models/user.model';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-detalle-categoria',
  templateUrl: './detalle-categoria.component.html',
  styleUrls: ['../categoria.component.scss']
})
export class DetalleCategoriaComponent {

  categoria: Categoria = new Categoria(1,'','','','');
  user!: User | null;

  formEditCategoria:FormGroup=this.fb.group({
    nombre:['',[Validators.required]],
    descripcion:['',[Validators.required]],
    imagen:['',[Validators.required]]
  });

  constructor(private fb:FormBuilder,private router: Router, private storeService: StoreService, private authService: AuthService) {
    this.getCategoria()
  }

  // Metodos Ciclo de Vida de Angular 
  ngOnInit() {
    this.authService.user$.subscribe(data => {
      this.user = data;
    })
  }

  //Metodos
  async getCategoria() {
    const id = this.storeService.catchCategoria()
    try {
      this.categoria = await this.storeService.getCategoriaById(id)
    } catch (error) {
      console.log(error)
    }
  }

  validarCampo(campo:string){
    return this.formEditCategoria.controls[campo].errors && this.formEditCategoria.controls[campo].touched;
  }

  updateCategoria(){
    const {nombre,descripcion,imagen}=this.formEditCategoria.value;
    const catg:Categoria = new Categoria(this.categoria.id,nombre,descripcion,'',imagen)
    this.storeService.putCategoria(this.categoria.id,catg)
    console.log(nombre)
    console.log(nombre,descripcion,imagen)
    // this.authService.LoginUser(nombre,descripcion).subscribe(ok=>{
    //   if(ok==true){
    //     this.router.navigateByUrl('/store');
    //   }else{
    //     Swal.fire('Error',ok,'error');
    //   }
    // })
  }

}
