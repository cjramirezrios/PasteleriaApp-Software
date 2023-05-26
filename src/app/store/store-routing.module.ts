import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProductoComponent } from './producto/producto.component';
import { DetalleComponent } from './producto/detalle.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { PerfilComponent } from './perfil/perfil.component';
import { InicioComponent } from './inicio/inicio.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PagoComponent } from './pago/pago.component';
import { LocalesComponent } from './locales/locales.component';

const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    children:[
      {
        path:'productos',
        component:ProductoComponent
      },
      {
        path:'detalle',
        component:DetalleComponent
      },
      {
        path:'categorias',
        component:CategoriaComponent
      },
      {
        path:'perfil',
        component:PerfilComponent
      },
      {
        path:'inicio',
        component:InicioComponent
      },
      {
        path:'pedido',
        component:PedidosComponent
      },
      {
        path:'carrito',
        component:CarritoComponent
      },
      {
        path:'pago',
        component:PagoComponent
      },
      {
        path:'locales',
        component:LocalesComponent
      },
      {
        path:'**',
        redirectTo:'inicio'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
