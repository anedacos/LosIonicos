import { Component, OnInit } from '@angular/core';
import { Product } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  carrito: Product[] = [];
  productos: Product[] =[];
  total=5;
  constructor() { }

  ngOnInit() {
    this.obtenerCarrito();
  }


  obtenerCarrito(){
    this.carrito=JSON.parse(localStorage.getItem("carrito"));
    console.log(this.carrito);
    this.total= this.productos.reduce((i, j) => i + j.price * j.amount, 0);
    return this.carrito
  }

  
}
