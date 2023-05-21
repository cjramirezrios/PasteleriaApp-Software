import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { ProductoComponent } from './producto/producto.component';
import { LocalesComponent } from './locales/locales.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { MainComponent } from './main/main.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PagoComponent } from './pago/pago.component';


@NgModule({
  declarations: [
    ProductoComponent,
    LocalesComponent,
    PedidosComponent,
    PerfilComponent,
    CategoriaComponent,
    MainComponent,
    CabeceraComponent,
    CarritoComponent,
    PagoComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule
  ]
})
export class StoreModule { }
