import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {
  cliente:boolean = true;
  catArray: string[] = [];
  btnSearchCollapsed: boolean = true;
  inputSearchValue: string = "";

  constructor(private router: Router, private route: ActivatedRoute){
    this.catArray = ["Pasteles", "Postres", "Galletas", "Helados", "Panes", "Bebidas"];
    console.log(this.catArray)
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      const nameCateg = params['id'];
      console.log(nameCateg)
    })
  }

  searchByCateg(tipo:string){
    this.router.navigate(['/store/productos', tipo]) // /store/productos/Pasteles
  }

  isLast(item:string):boolean {
    let last:boolean = false;
    const i:number = this.catArray.findIndex(el => el === item);
    last = i === this.catArray.length - 1;
    return last
  }

  setBtnSearchCollapsed(b:boolean){
    this.btnSearchCollapsed = b;
  }

  searchByNameProd(){
    console.log(this.inputSearchValue)
  }

}
