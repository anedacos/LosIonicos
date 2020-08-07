//import { Product } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

/*
  Generated class for the ServicesCartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
}

@Injectable()
export class CartService {
  data: Product[] = [
    { id: 0, name: "Agua", price: 1, amount: 1 },
    { id: 1, name: "Soda", price: 1, amount: 1 },
    { id: 2, name: "Jugo", price: 1, amount: 1 },
    { id: 3, name: "Cerveza", price: 1, amount: 1 },
  ];

  private cart = [];

  private cartItemCount = new BehaviorSubject(0);

  constructor() {}

  getProducts() {
    return this.data;
  }

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(Product) {}

  decreaseProduct(Product) {}

  removeProduct(Product) {}
}
