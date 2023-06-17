import { Injectable } from '@angular/core';
import { Subject, Observable, lastValueFrom, firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Categoria, interfaceCategory } from '../../models/categoria.model'
import { Producto, interfaceProduct } from '../../models/producto.model'
import { Usuario, interfaceUser, UserCustomer } from '../../models/usuario.model'
import { Cliente, interfaceCustomer, CustomerOrder } from '../../models/cliente.model'
import { Pedido, interfaceOrder, PedidoFULL } from '../../models/pedido.model'
import { Detalle, DetailProduct } from '../../models/detalle.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  //Properties
  private apiRoute: string = environment.apiUrl;
  private categoriaSelecionada: number = 0;
  private productoSelected: number = 0;
  private pedidoSelected: string = '';
  private userLoginId: number = 0;
  private token: string = ''
  /*
  // private categoria:Subject<string[]>;
  // categObs = this.categoria.asObservable();
  */

  constructor(private http: HttpClient) {
    this.token = this.getToken()
  }


  // PETICIONES HTTP A LA API | Start -->

  //Metodo GetAllCategorias                    SELECT * FROM categorias
  async getAllCategorias(): Promise<Categoria[]> {
    let categorias: Categoria[] = [];
    try {
      const data = await firstValueFrom(this.http.get<interfaceCategory[]>(this.apiRoute + 'category/'))
      for (let item of data) {
        const categoria = new Categoria(item.id, item.name, item.description, item.createdAt, item.image)
        categorias.push(categoria)
      }
    } catch (error) {
      console.log(error)
    } finally {
      return categorias
    }
  }
  //Metodo GetAllCategoriasOnlyId&Name         SELECT id,nombre FROM categorias 
  async getAllCategoriasOnlyId_y_Name(): Promise<Categoria[]> {
    let categorias: Categoria[] = [];
    let categoriasId_y_Name: Categoria[] = [];
    try {
      categorias = await this.getAllCategorias()
      categoriasId_y_Name = categorias.map(e => new Categoria(e.id, e.nombre, '', '', ''))
    } catch (error) {
      console.log(error)
    } finally {
      return categoriasId_y_Name
    }
  }
  //Metodo GetAllCategoriasOnlyName            SELECT nombre FROM categorias
  async getAllCategoriasOnlyName(): Promise<string[]> {
    let categorias: Categoria[] = [];
    let categoriasName: string[] = [];
    try {
      categorias = await this.getAllCategorias()
      categoriasName = categorias.map(e => e.nombre)
    } catch (error) {
      console.log(error)
    } finally {
      return categoriasName
    }
  }
  //Metodo GetCategoriaByName                  SELECT * FROM categorias WHERE nombre=nombre
  async getCategoriaByName(name: string): Promise<Categoria> {
    let categoria: Categoria = new Categoria(0, '', '', '', '')
    try {
      const categorias = await this.getAllCategorias();
      categoria = categorias.find(e => e.nombre === name) ?? new Categoria(0, '', '', '', '')
    } catch (error) {
      console.log(error)
    } finally {
      return categoria
    }
  }
  //Metodo GetCategoriaById                    SELECT * FROM categorias WHERE id=id
  async getCategoriaById(id: number): Promise<Categoria> {
    let categoria!: Categoria;
    try {
      const data = await firstValueFrom(this.http.get<interfaceCategory>(this.apiRoute + 'category/' + id))
      categoria = new Categoria(data.id, data.name, data.description, data.createdAt, data.image)
    } catch (error) {
      console.log(error)
    } finally {
      return categoria
    }
  }

  //Metodo PutCategoria
  putCategoria(id: number, catg: Categoria) {
    // this.token = this.getToken()
    const headers: HttpHeaders = new HttpHeaders({
      'x-token': `${this.token}`
    })
    const categoria = {
      name: catg.nombre,
      description: catg.descripcion,
      image: catg.imagen
    }
    try {
      const data = this.http.put<interfaceCategory>(this.apiRoute + 'category/' + id, categoria, { headers }).subscribe(
        res => {
          if (res) {
            Swal.fire('Categoria Modificada', 'Se actualizó correctamente', 'success');
          } else {
            Swal.fire('Error', res, 'error');
          }
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  //Metodo GetAllProductos                     SELECT * FROM productos
  async getAllProducts(): Promise<Producto[]> {
    let productos: Producto[] = [];
    try {
      const data = await firstValueFrom(this.http.get<interfaceProduct[]>(this.apiRoute + 'product/'))
      for (let item of data) {
        const producto = new Producto(item.id, item.categoryId, item.name, item.description, item.price, item.createdAt, item.stock, item.image)
        productos.push(producto)
      }
    } catch (error) {
      console.log(error)
    } finally {
      return productos
    }
  }
  //Metodo GetAllProductsOnlyId&Name           SELECT id,nombre FROM productos 
  async getAllProductsOnlyId_y_Name(): Promise<Producto[]> {
    let productos: Producto[] = [];
    let productosId_y_Name: Producto[] = [];
    try {
      productos = await this.getAllProducts()
      productosId_y_Name = productos.map(e => new Producto(e.id, 0, e.nombre, '', 0, '', 0, ''))
    } catch (error) {
      console.log(error)
    } finally {
      return productosId_y_Name
    }
  }
  //Metodo GetProductById                      SELECT * FROM productos WHERE idProducto = idProducto
  async getProductById(id: number): Promise<Producto> {
    let producto!: Producto;
    try {
      const data = await firstValueFrom(this.http.get<interfaceProduct>(this.apiRoute + 'product/' + id))
      producto = new Producto(data.id, data.categoryId, data.name, data.description, data.price, data.createdAt, data.stock, data.image)
    } catch (error) {
      console.log(error)
    } finally {
      return producto
    }
  }
  //Metodo GetProductsByIdCategoria            SELECT * FROM productos WHERE idCategoria = idCategoria
  async getProductsByIdCategoria(idCategoria: number): Promise<Producto[]> {
    let productos: Producto[] = [];
    try {
      const data = await firstValueFrom(this.http.get<interfaceCategory>(this.apiRoute + 'category/' + idCategoria))
      for (let item of data.products) {
        const producto = new Producto(item.id, item.categoryId, item.name, item.description, item.price, item.createdAt, item.stock, item.image)
        productos.push(producto)
      }
    } catch (error) {
      console.log(error)
    } finally {
      return productos
    }
  }
  //Metodo PutCategoria
  putProducto(id: number, prod: Producto) {
    const headers: HttpHeaders = new HttpHeaders({
      'x-token': `${this.token}`
    })
    const producto = {
      categoryId: prod.idCategoria,
      name: prod.nombre,
      description: prod.descripcion,
      price: prod.precio,
      stock: prod.stock,
      image: prod.imagen
    }
    try {
      const data = this.http.put<interfaceProduct>(this.apiRoute + 'product/' + id, producto, { headers }).subscribe(
        res => {
          if (res) {
            Swal.fire('Producto Modificado', 'Se actualizó correctamente', 'success');
          } else {
            Swal.fire('Error', res, 'error');
          }
        }
      )
    } catch (error) {
      console.log(error)
    }
  }


  //Metodo GetAllUsers --> 'x-token'           SELECT * FROM usuarios
  async getAllUsers(): Promise<UserCustomer[]> {
    let usuarios: UserCustomer[] = [];
    const headers: HttpHeaders = new HttpHeaders({
      'x-token': `${this.token}`
    })
    try {
      const data = await firstValueFrom(this.http.get<interfaceUser[]>(this.apiRoute + 'user/', { headers }))
      for (let item of data) {
        const usuario = new Usuario(item.id, item.email, item.password, item.role, item.createAt)
        let cliente = new Cliente(0, 0, '', '', '', '', '')
        if (item.role === 'customer') {
          cliente = new Cliente(item.customer.id, item.customer.userId, item.customer.name, item.customer.lastName, item.customer.address, item.customer.phone, item.customer.createdAt)
        }
        const user_client = new UserCustomer(usuario, cliente)
        usuarios.push(user_client)
      }
    } catch (error) {
      console.log(error)
    } finally {
      return usuarios
    }
  }
  //Metodo GetUserById --> 'x-token'           SELECT * FROM usuarios WHERE id=id
  async getUserById(id: number): Promise<UserCustomer> {
    let persona!: UserCustomer
    const headers: HttpHeaders = new HttpHeaders({
      'x-token': `${this.token}`
    })
    try {
      const data = await firstValueFrom(this.http.get<interfaceUser>(this.apiRoute + 'user/' + id, { headers }))
      const usuario = new Usuario(data.id, data.email, data.password, data.role, data.createAt)
      let cliente = new Cliente(0, 0, '', '', '', '', '')
      if (data.role === 'customer') {
        cliente = new Cliente(data.customer.id, data.customer.userId, data.customer.name, data.customer.lastName, data.customer.address, data.customer.phone, data.customer.createdAt)
      }
      persona = new UserCustomer(usuario, cliente)
    } catch (error) {
      console.log(error)
    } finally {
      return persona
    }
  }
  //Metodo GetUserByToken --> 'x-token'
  async getUserByToken(): Promise<UserCustomer> {
    let persona: UserCustomer = new UserCustomer(
      new Usuario(0, '', '', '', ''),
      new Cliente(0, 0, '', '', '', '', '')
    )
    const token = this.getToken() //AGregar esto a los demas 'x-token'
    const headers: HttpHeaders = new HttpHeaders({
      'x-token': `${token}`
    })
    try {
      const data = await firstValueFrom(this.http.get<interfaceUser>(this.apiRoute + 'usertoken/', { headers }))
      if (data.id > 0) {
        const usuario = new Usuario(data.id, data.email, data.password, data.role, data.createAt)
        let cliente = new Cliente(0, 0, '', '', '', '', '')
        if (data.role === 'customer') {
          cliente = new Cliente(data.customer.id, data.customer.userId, data.customer.name, data.customer.lastName, data.customer.address, data.customer.phone, data.customer.createdAt)
        }
        persona = new UserCustomer(usuario, cliente)
      }
    } catch (error) {
      console.log(error)
    } finally {
      return persona
    }
  }

  //Metodo GetTokenValidation --> 'x-token'
  async getTokenValidation(): Promise<boolean> {
    let valido: boolean = false
    const headers: HttpHeaders = new HttpHeaders({
      'x-token': `${this.token}`
    })
    try {
      const data = await firstValueFrom(this.http.get<interfaceUser>(this.apiRoute + 'usertoken/', { headers }))
      if (data.id > 0) {
        valido = true
      }
    } catch (error) {
      console.log(error)
    } finally {
      return valido
    }
  }

  //Metodo GetAllCustomers --> 'x-token'        SELECT * FROM clientes
  async getAllCustomers(): Promise<UserCustomer[]> {
    let clientes: UserCustomer[] = [];
    const headers: HttpHeaders = new HttpHeaders({
      'x-token': `${this.token}`
    })
    try {
      const data = await firstValueFrom(this.http.get<interfaceCustomer[]>(this.apiRoute + 'customer/', { headers }))
      for (let item of data) {
        const cliente = new Cliente(item.id, item.userId, item.name, item.lastName, item.address, item.phone, item.createdAt)
        const usuario = new Usuario(item.user.id, item.user.email, item.user.password, item.user.role, item.user.createAt)
        const client_user = new UserCustomer(usuario, cliente)
        clientes.push(client_user)
      }
    } catch (error) {
      console.log(error)
    } finally {
      return clientes
    }
  }
  //Metodo GetCustomerById --> 'x-token'        SELECT * FROM clientes WHERE id=id
  async getCustomerById(id: number): Promise<CustomerOrder> {
    let clientePedidos!: CustomerOrder
    const headers: HttpHeaders = new HttpHeaders({
      'x-token': `${this.token}`
    })
    try {
      const data = await firstValueFrom(this.http.get<interfaceCustomer>(this.apiRoute + 'customer/' + id, { headers }))
      const cliente = new Cliente(data.id, data.userId, data.name, data.lastName, data.address, data.phone, data.createdAt)
      let pedidos: Pedido[] = []
      for (let item of data.pedidos) {
        const pedido = new Pedido(item.id, item.customerId, item.createdAt, item.total)
        pedidos.push(pedido)
      }
      clientePedidos = new CustomerOrder(cliente, pedidos)
    } catch (error) {
      console.log(error)
    } finally {
      return clientePedidos
    }
  }

  //Metodo GetAllOrders --> 'x-token'           SELECT * FROM pedidos
  async getAllOrders(): Promise<Pedido[]> {
    let pedidos: Pedido[] = [];
    const headers: HttpHeaders = new HttpHeaders({
      'x-token': `${this.token}`
    })
    try {
      const data = await firstValueFrom(this.http.get<interfaceOrder[]>(this.apiRoute + 'pedido/', { headers }))
      for (let item of data) {
        const pedido = new Pedido(item.id, item.customerId, item.createdAt, item.total)
        pedidos.push(pedido)
      }
    } catch (error) {
      console.log(error)
    } finally {
      return pedidos
    }
  }
  //Metodo GetOrderById --> 'x-token'           SELECT * FROM pedidos WHERE id=id
  async getOrderById(id: string): Promise<PedidoFULL> {
    let pedidoFull!: PedidoFULL;
    const headers: HttpHeaders = new HttpHeaders({
      'x-token': `${this.token}`
    })
    try {
      const data = await firstValueFrom(this.http.get<interfaceOrder>(this.apiRoute + 'pedido/' + id, { headers }))
      const pedido = new Pedido(data.id, data.customerId, data.createdAt, data.total)
      const cliente = new Cliente(data.customer.id, data.customer.userId, data.customer.name, data.customer.lastName, data.customer.address, data.customer.phone, data.customer.createdAt)
      const usuario = new Usuario(data.customer.user.id, data.customer.user.email, data.customer.user.password, data.customer.user.role, data.customer.user.createAt)
      let items: DetailProduct[] = []
      for (let item of data.items) {
        const p = new Producto(item.id, item.categoryId, item.name, item.description, item.price, item.createdAt, item.stock, item.image)
        const d = new Detalle(item.PedidoProductos.id, item.PedidoProductos.pedidoId, item.PedidoProductos.productId, item.PedidoProductos.createAt, item.PedidoProductos.amount)
        const detProd = new DetailProduct(d, p)
        items.push(detProd)
      }
      pedidoFull = new PedidoFULL(pedido, cliente, usuario, items)
    } catch (error) {
      console.log(error)
    } finally {
      return pedidoFull
    }
  }

  // <-- End | PETICIONES HTTP A LA API


  //Metodos Enviar Datos - Comunicacion entre Componentes
  sendCategoria(id: number) {
    this.categoriaSelecionada = id;
  }
  sendProducto(id: number) {
    this.productoSelected = id;
  }
  sendPedido(id: string) {
    this.pedidoSelected = id;
  }
  sendUserLogged(id: number) {
    this.userLoginId = id
  }

  //Metodos Obtener Datos - Comunicacion entre Componentes
  catchCategoria(): number {
    return this.categoriaSelecionada
  }
  catchProducto(): number {
    return this.productoSelected
  }
  catchPedido(): string {
    return this.pedidoSelected
  }
  catchUserLogged(): number {
    return this.userLoginId
  }

  //Carrito LocalStorage
  saveCarrito(items: number[][]) {
    localStorage.setItem('carrito', JSON.stringify(items))
  }
  getCarrito(): number[][] {  //verificar que los datos son del typeof requerido: number, string
    const items: number[][] = JSON.parse(localStorage.getItem('carrito') ?? '[]')
    return items
  }
  removeCarrito() {
    localStorage.removeItem('carrito')
  }


  //Guardar Token en el LocalStorage
  saveToken(token: string) {
    localStorage.setItem('token', token)
  }
  saveUserLoggedId(id: number) {
    localStorage.setItem('IdUserLogged', id.toString())
  }
  //Obtener Token del LocalStorage
  getToken(): string {
    return localStorage.getItem('token') ?? ''
  }
  getUserLoggedId(): number {
    const id: string = localStorage.getItem('IdUserLogged') ?? '0'
    return Number.parseInt(id)
  }
  //Eliminar Token del LocalStorage
  removeToken() {
    localStorage.removeItem('token')
  }
  removeUserLoggedId() {
    localStorage.removeItem('IdUserLogged')
  }

}
