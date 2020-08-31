import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
}

@Injectable({
  providedIn: "root",
})
export class CartService {
  data: Product[] = [
    { id: 1, name: "Coca Cola", price: 0.75, amount: 1 },
    { id: 6, name: "Agua YAKU 1L", price: 0.75, amount: 1 },
    { id: 7, name: "Agua YAKU galon", price: 1.5, amount: 1 },
    { id: 8, name: "Bebida Sabor naranja", price: 0.75, amount: 1 },
    { id: 4, name: "Volt Yellow", price: 0.75, amount: 1 },
    { id: 3, name: "Saviloe", price: 0.75, amount: 1 },
    { id: 2, name: "Bebida Sabor a limón", price: 0.75, amount: 1 },
    { id: 9, name: "Vive 100", price: 1, amount: 1 },
    { id: 0, name: "Sprite", price: 0.5, amount: 1 },
    { id: 5, name: "Agua YAKU Botellón", price: 6.51, amount: 1 },
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

  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreaseProduct(product) {
    for (let [index, p] of Array.from(this.cart.entries())) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount === 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product) {
    for (let [index, p] of Array.from(this.cart.entries())) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }

  uploadCartSession(cart) {
    localStorage.setItem("carrito", JSON.stringify(cart));
  }
}
