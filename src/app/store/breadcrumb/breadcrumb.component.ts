import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
/*
    rutaActual: string = "";
    showComponent: boolean = false;
    rutaActualSplit: string[] = [];
    breadcrumbArray: string[] = [];
    breadcrumbLast: string = "";
    rutas: string[][] = [
        ['perfil','Mi Cuenta'],
        ['locales','Locales'],
        ['categorias','Categorias'],
        ['productos','Productos'],
        ['pedido','Mis Pedidos'],
        ['carrito','Carrito']
    ];
    constructor(private router: Router, private route: ActivatedRoute) {this.updateBreadcrumb()}
    
    ngOnInit() {
        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe(() => {
                console.log("estoy suscrito");
                this.breadcrumbArray = [];
                this.breadcrumbLast = "";
                this.updateBreadcrumb();
            })
    }

    updateBreadcrumb(){
        this.rutaActual = this.router.url;
        this.showComponent = this.rutaActual === "/store/inicio";
        this.rutaActualSplit = this.rutaActual.split("/");
        if (!this.showComponent) {
            for (let i: number = 2; i < this.rutaActualSplit.length; i++) {
                if (i < this.rutaActualSplit.length - 1) {
                    if (i === 2) {
                        // for(let item of this.rutas){}
                        switch (this.rutaActualSplit[i]) {
                            case "perfil":
                                this.breadcrumbArray.push("Mi Cuenta");
                                break;
                            case "locales":
                                this.breadcrumbArray.push("Locales");
                                break;
                            case "categorias":
                                this.breadcrumbArray.push("Categorias");
                                break;
                            case "productos":
                                this.breadcrumbArray.push("Productos");
                                break;
                            case "pedido":
                                this.breadcrumbArray.push("Mis Pedidos");
                                break;
                            case "carrito":
                                this.breadcrumbArray.push("Carrito");
                                break;
                            default:
                                break;
                        }
                    } else {
                        if (i === 3) {
                            switch (this.rutaActualSplit[i]) {
                                case "perfil":
                                    this.breadcrumbArray.push("Mi Cuenta");
                                    break;
                                case "locales":
                                    this.breadcrumbArray.push("Locales");
                                    break;
                                case "categorias":
                                    this.breadcrumbArray.push("Categorias");
                                    break;
                                case "productos":
                                    this.breadcrumbArray.push("Productos");
                                    break;
                                case "pedido":
                                    this.breadcrumbArray.push("Mis Pedidos");
                                    break;
                                case "carrito":
                                    this.breadcrumbArray.push("Carrito");
                                    break;
                                case "detalle":
                                    switch (this.rutaActualSplit[i - 1]) {
                                        case "productos":
                                            this.breadcrumbArray.push("Detalle de Producto");
                                            break;
                                        case "pedido":
                                            this.breadcrumbArray.push("Detalle de Pedido");
                                            break;
                                    }
                                    break;
                                default:
                                    this.breadcrumbArray.push(this.rutaActualSplit[i])
                                    break;
                            }
                        }
                    }
                } else {
                    switch (this.rutaActualSplit[i]) {
                        case "perfil":
                            this.breadcrumbLast = "Mi Cuenta";
                            break;
                        case "locales":
                            this.breadcrumbLast = "Locales";
                            break;
                        case "categorias":
                            this.breadcrumbLast = "Categorias";
                            break;
                        case "productos":
                            this.breadcrumbLast = "Productos";
                            break;
                        case "pedido":
                            this.breadcrumbLast = "Mis Pedidos";
                            break;
                        case "carrito":
                            this.breadcrumbLast = "Carrito";
                            break;
                        case "detalle":
                            switch (this.rutaActualSplit[i - 1]) {
                                case "productos":
                                    this.breadcrumbLast = "Detalle de Producto";
                                    break;
                                case "pedido":
                                    this.breadcrumbLast = "Detalle de Pedido";
                                    break;
                            }
                            break;
                        default:
                            this.breadcrumbLast = this.rutaActualSplit[i];
                            break;
                    }
                }
            }
        }
        console.log(this.rutaActual, !this.showComponent, this.rutaActualSplit)

    }*/
}
