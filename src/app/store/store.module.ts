import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { StoreService } from './services/store.service'

import { StoreRoutingModule } from './store-routing.module';
import { MainComponent } from './main/main.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LocalesComponent } from './locales/locales.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ProductoComponent } from './producto/producto.component';
import { DetalleProductoComponent } from './producto/detalle/detalle-producto.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { DetallePedidoComponent } from './pedidos/detalle/detalle-pedido.component';
import { CarritoComponent } from './carrito/carrito.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
// import { PagoComponent } from './pago/pago.component';


@NgModule({
  declarations: [
    MainComponent,
    CabeceraComponent,
    BreadcrumbComponent,
    InicioComponent,
    PerfilComponent,
    LocalesComponent,
    CategoriaComponent,
    ProductoComponent,
    DetalleProductoComponent,
    PedidosComponent,
    DetallePedidoComponent,
    CarritoComponent,
    EditarProductoComponent,
    EditarCategoriaComponent
    // PagoComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [StoreService]
})
export class StoreModule { }
