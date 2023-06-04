import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';

import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LocalesComponent } from './locales/locales.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ProductoComponent } from './producto/producto.component';
import { DetalleProductoComponent } from './producto/detalle/detalle-producto.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { DetallePedidoComponent } from './pedidos/detalle/detalle-pedido.component';
import { CarritoComponent } from './carrito/carrito.component';
// import { PagoComponent } from './pago/pago.component';

const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    children:[
      {
        path:'inicio',
        component:InicioComponent
      },
      {
        path:'perfil',
        component:PerfilComponent
      },
      {
        path:'locales',
        component:LocalesComponent
      },
      {
        path:'categorias',
        component:CategoriaComponent
      },
      {
        path:'productos',
        component:ProductoComponent
      },
      {
        path:'productos/detalle',
        component:DetalleProductoComponent
      },
      {
        path:'pedido',
        component:PedidosComponent
      },
      {
        path:'pedido/detalle',
        component:DetallePedidoComponent
      },
      {
        path:'carrito',
        component:CarritoComponent
      },
      // {
      //   path:'pago',
      //   component:PagoComponent
      // },
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
