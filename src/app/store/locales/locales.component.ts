import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.scss']
})
export class LocalesComponent {

  gamarra_address: string = "Jr. Francia 1557.";
  gamarra_ref: string = "A media cuadra de la  Galería San Pedro, frente al parque.";

  sanLuis_address: string = "Av. Canadá 3630";
  sanLuis_ref: string = "";

  santaAnita_address_1: string = "Virreyes: Av. Los Virreyes Mz. BLt. 14. Cooperativa viña San Francisco.";
  santaAnita_ref_1: string = "";
  santaAnita_address_2: string = "Metropolitana: Mz. B Lote 5B.";
  santaAnita_ref_2: string = "";
  santaAnita_address_3: string = "Los Ficus: Av. Los Eucaliptos Nro 1020-1024, Urb. Los Ficus.";
  santaAnita_ref_3: string = "";

  ate_address_1: string = "Los Ángeles: Av. Metropolitana Mz. S 12 Los Ángeles Sector F, Lima 15011.";
  ate_ref_1: string = "Al lado de El Chuletón.";
  ate_address_2: string = "Vista Alegre/Puruchuco: Av. Vista Alegre A lote 12 Cooperación de Vivienda Marañón.";
  ate_ref_2: string = "Frente al Real Plaza Puruchuco.";
  ate_address_3: string = "Santa Rosa: Av. Santa Rosa 592. Salamanca.";
  ate_ref_3: string = "";

  rastreador:number = 1;

  @ViewChild('ate') idAte!: ElementRef;
  @ViewChild('gamarra') idGamarra!: ElementRef;
  @ViewChild('san_luis') idSanLuis!: ElementRef;
  @ViewChild('santa_anita') idSantaAnita!: ElementRef;

  constructor() { }

  // ngAfterViewInit(){
  //   console.log(this.idAte)
  //   console.log(this.idGamarra)
  //   console.log(this.idSanLuis)
  //   console.log(this.idSantaAnita)
  // }

  scrollTo(elementId: string) {
    let element: any;
    switch (elementId) {
      case 'ate':
        element = this.idAte.nativeElement;
        element.scrollIntoView({ behavior: 'smooth' });
        this.rastreador = 1;
        break;
      case 'gamarra':
        element = this.idGamarra.nativeElement;
        element.scrollIntoView({ behavior: 'smooth' });
        this.rastreador = 2;
        break;
      case 'san_luis':
        element = this.idSanLuis.nativeElement;
        element.scrollIntoView({ behavior: 'smooth' });
        this.rastreador = 3;
        break;
      case 'santa_anita':
        element = this.idSantaAnita.nativeElement;
        element.scrollIntoView({ behavior: 'smooth' });
        this.rastreador = 4;
        break;
      default:
        break;
    }
  }

}
