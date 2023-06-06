import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Categoria } from '../../models/categoria.model'
import { Producto } from '../../models/producto.model'

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  // LLamadas a la API
  public categorias: Categoria[] = [
    new Categoria(1,"Pasteles",'','','https://images.food52.com/5zez-Jt87mU0Dhx_6U-8xwRK5zs=/fit-in/1200x1200/50a83e17-f69a-48f2-a8ba-8f7dafab24f1--2016-0910_cake-buffet_james-ransom-249.jpg'),
    new Categoria(2,"Postres",'','','https://explore.bustickets.com/wp-content/uploads/2019/07/Best_Cities_Delicious_Desserts.jpg'),
    new Categoria(3,"Galletas",'','','https://www.siliconrepublic.com/wp-content/uploads/2018/05/shutterstock_1089152144-1-718x523.jpg'),
    new Categoria(4,"Helados",'','','https://www.listchallenges.com/f/lists/58a34e6b-0d89-4a95-8c6a-8ae4ba48a85f.jpg'),
    new Categoria(5,"Panes",'','','https://thumbs.dreamstime.com/b/many-mixed-breads-rolls-shot-above-baskets-different-types-bread-display-case-mahan-yehuda-market-171754536.jpg'),
    new Categoria(6,"Bebidas",'','','https://janbox.com/blog/wp-content/uploads/2022/07/Top-16-most-popular-Japanese-drinks.jpg')
  ]
  public productos: Producto[] = [
    new Producto(1,1,'Soufflé de fresas','',123,'',0,'https://dc.com.pe/wp-content/uploads/2021/12/x2.jpg'),
    new Producto(2,1,'Soufflé de chirimoyas','',120,'',0,'https://dc.com.pe/wp-content/uploads/2021/12/x3.jpg'),
    new Producto(3,1,'Cheesecake de brownie','',115,'',0,'https://dc.com.pe/wp-content/uploads/2021/10/Brownie-caramel-NY-cheesecake-DC-nuevo-300x300.jpg'),
    new Producto(4,2,'Producto Categoria 2','',120,'',0,'https://us.123rf.com/450wm/captainvector/captainvector2207/captainvector220741406/189237480-t%C3%ADtulo-del-men%C3%BA-de-postres.jpg?ver=6'),
    new Producto(5,2,'Producto Categoria 2','',115,'',0,'https://us.123rf.com/450wm/captainvector/captainvector2207/captainvector220741406/189237480-t%C3%ADtulo-del-men%C3%BA-de-postres.jpg?ver=6'),
    new Producto(6,2,'Producto Categoria 2','',120,'',0,'https://us.123rf.com/450wm/captainvector/captainvector2207/captainvector220741406/189237480-t%C3%ADtulo-del-men%C3%BA-de-postres.jpg?ver=6'),
    new Producto(7,3,'Producto Categoria 3','',115,'',0,'https://thumbs.dreamstime.com/z/tarjeta-con-las-galletas-y-t%C3%ADtulo-105227829.jpg'),
    new Producto(8,3,'Producto Categoria 3','',115,'',0,'https://thumbs.dreamstime.com/z/tarjeta-con-las-galletas-y-t%C3%ADtulo-105227829.jpg'),
    new Producto(9,3,'Producto Categoria 3','',115,'',0,'https://thumbs.dreamstime.com/z/tarjeta-con-las-galletas-y-t%C3%ADtulo-105227829.jpg'),
    new Producto(10,4,'Producto Categoria 4','',115,'',0,'https://pbs.twimg.com/media/DombWAzXoAAL2Ax.jpg'),
    new Producto(11,4,'Producto Categoria 4','',115,'',0,'https://pbs.twimg.com/media/DombWAzXoAAL2Ax.jpg'),
    new Producto(12,4,'Producto Categoria 4','',115,'',0,'https://pbs.twimg.com/media/DombWAzXoAAL2Ax.jpg'),
    new Producto(13,5,'Producto Categoria 5','',115,'',0,'https://panaderia.pe/wp-content/uploads/Diseno-sin-titulo-12.png'),
    new Producto(14,5,'Producto Categoria 5','',115,'',0,'https://panaderia.pe/wp-content/uploads/Diseno-sin-titulo-12.png'),
    new Producto(15,5,'Producto Categoria 5','',115,'',0,'https://panaderia.pe/wp-content/uploads/Diseno-sin-titulo-12.png'),
    new Producto(16,6,'Producto Categoria 6','',115,'',0,'https://as2.ftcdn.net/v2/jpg/01/93/39/01/1000_F_193390117_Yh4N3kBwtfzQMWrq5HFTkNkIhOQmrdmG.jpg'),
    new Producto(17,6,'Producto Categoria 6','',115,'',0,'https://as2.ftcdn.net/v2/jpg/01/93/39/01/1000_F_193390117_Yh4N3kBwtfzQMWrq5HFTkNkIhOQmrdmG.jpg'),
    new Producto(18,6,'Producto Categoria 6','',115,'',0,'https://as2.ftcdn.net/v2/jpg/01/93/39/01/1000_F_193390117_Yh4N3kBwtfzQMWrq5HFTkNkIhOQmrdmG.jpg'),
  ]


  //properties
  public categoriaSelecionada:string;
  private categoria:Subject<string[]>;
  // categObs = this.categoria.asObservable();


  constructor() {
    this.categoriaSelecionada = '';
    this.categoria = new Subject()
  }

  sendCategoria(c:string){
    this.categoriaSelecionada = c;
  }

  getCategoria(): Observable<string[]>{
    return this.categoria.asObservable();
  }

  printConsola(){
    console.log('Imprimido por el Receptor')
  }

}
