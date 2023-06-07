import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Categoria } from '../../models/categoria.model'
import { Producto } from '../../models/producto.model'
import { Usuario } from '../../models/usuario.model'

//Clase Temporal para Simular el JSON
class ProductoId_y_Name {
  id:number;
  nombre:string;
  constructor(id:number, nombre:string){
    this.id = id;
    this.nombre = nombre
  }
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  // LLamadas a la API | Start -->
  //Metodo GetAllCategorias                    SELECT * FROM categorias
  getAllCategorias(): Categoria[]{
    const categorias: Categoria[] = [
      new Categoria(1,"Pasteles",'','','https://images.food52.com/5zez-Jt87mU0Dhx_6U-8xwRK5zs=/fit-in/1200x1200/50a83e17-f69a-48f2-a8ba-8f7dafab24f1--2016-0910_cake-buffet_james-ransom-249.jpg'),
      new Categoria(2,"Postres",'','','https://explore.bustickets.com/wp-content/uploads/2019/07/Best_Cities_Delicious_Desserts.jpg'),
      new Categoria(3,"Galletas",'','','https://www.siliconrepublic.com/wp-content/uploads/2018/05/shutterstock_1089152144-1-718x523.jpg'),
      new Categoria(4,"Helados",'','','https://www.listchallenges.com/f/lists/58a34e6b-0d89-4a95-8c6a-8ae4ba48a85f.jpg'),
      new Categoria(5,"Panes",'','','https://thumbs.dreamstime.com/b/many-mixed-breads-rolls-shot-above-baskets-different-types-bread-display-case-mahan-yehuda-market-171754536.jpg'),
      new Categoria(6,"Bebidas",'','','https://janbox.com/blog/wp-content/uploads/2022/07/Top-16-most-popular-Japanese-drinks.jpg')
    ]
    return categorias
  }
  //Metodo GetAllCategoriasOnlyName            SELECT nombre FROM categorias
  getAllCategoriasOnlyName():string[]{
    const categoriasName:string[] = this.getAllCategorias().map(e => e.nombre)
    return categoriasName
  }
  //Metodo GetCategoriaByName                  SELECT * FROM categorias WHERE nombre=nombre
  getCategoriaByName(name:string):Categoria{
    const categoria:Categoria = this.getAllCategorias().find(e => e.nombre === name) ?? new Categoria(0,'','','','')
    return categoria
  }
  //Metodo GetAllProductos                     SELECT * FROM productos
  getAllProducts(): Producto[]{
    const productos: Producto[] = [
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
    return productos
  }
  //Metodo GetAllProductsOnlyId&Name           SELECT id,nombre FROM productos 
    getAllProductsOnlyId_y_Name():ProductoId_y_Name[]{
    let productoSimplificadoArray:ProductoId_y_Name[] = []
    for (let p of this.getAllProducts()){
      productoSimplificadoArray.push(new ProductoId_y_Name(p.id,p.nombre))
    }
    return productoSimplificadoArray
  }
  //Metodo GetProductById                      SELECT * FROM productos WHERE idProducto = idProducto
  getProductById(id:number):Producto{
    let producto: Producto = new Producto(0,0,'','',0,'',0,'')
    for (let p of this.getAllProducts()){
      if(p.id === id){
        producto = p
        break
      }
    }
    return producto
  }
  //Metodo GetProductsByIdCategoria            SELECT * FROM productos WHERE idCategoria = idCategoria
  getProductsByIdCategoria(idCategoria:number):Producto[]{
    const productosByCategoria:Producto[] = this.getAllProducts().filter(e => e.idCategoria === idCategoria)
    return productosByCategoria
  }
  //Metodo GetAllUsuario                       SELECT * FROM usuarios
  getAllUsuario():Usuario[]{
    const usuarios: Usuario[] = [
      new Usuario(1,'','','','admin'),
      new Usuario(2,'','','','admin'),
      new Usuario(3,'','','','cliente'),
      new Usuario(4,'','','','cliente'),
      new Usuario(5,'','','','cliente'),
      new Usuario(6,'','','','cliente'),
      new Usuario(7,'','','','cliente'),
      new Usuario(8,'','','','cliente'),
    ]
    return usuarios
  }
  //Metodo GetAllCliente                       SELECT * FROM clientes
  // <-- End | Llamadas a la API


  //Properties
  private categoriaSelecionada:string;
  /*
  // private categoria:Subject<string[]>;
  // categObs = this.categoria.asObservable();
  */


  constructor() {
    this.categoriaSelecionada = '';
    // this.categoria = new Subject()
  }


  //Metodos Enviar Datos - Comunicacion entre Componentes
  sendCategoria(c:string){
    this.categoriaSelecionada = c;
  }

  //Metodos Obtener Datos - Comunicacion entre Componentes
  getCategoria():string{
    return this.categoriaSelecionada
  }

}
