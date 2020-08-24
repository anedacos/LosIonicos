import { Component, OnInit } from '@angular/core';
import { Product } from '../services/cart.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  carrito: Product[] = [];
  productos: Product[] =[];
  total=5;
  direccion: string;
  nombres: string;
  constructor(
    public router: Router,
    private firebaseService: FirebaseService,

  ) { }

  ngOnInit() {
    this.obtenerCarrito();
  }


  obtenerCarrito(){
    this.carrito=JSON.parse(localStorage.getItem("carrito"));
    
    this.total= this.carrito.reduce((i, j) => i + j.price * j.amount, 0);
    console.log(this.total);
    return this.carrito
  }
  realizarCompra(){
    //Debo obtener estos datos desde un form de ionic como en new task
    let data = {
      nombre: this.nombres,
      direccion: this.direccion,
      total: this.total,
      estado:"Preparando",
      image:  "./assets/imgs/default_image.jpg"
    }
    this.firebaseService.createPedido(data)
    .then(
      res => {
        this.router.navigate(["/pedidos"]);
      }
    )
  }
}
