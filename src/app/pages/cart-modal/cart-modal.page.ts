import { CartService } from "../../services/cart.service";
import { Component, OnInit } from "@angular/core";
import { Product } from "../../services/cart.service";
import { ModalController } from "@ionic/angular";
import { Router } from '@angular/router';

@Component({
  selector: "app-cart-modal",
  templateUrl: "./cart-modal.page.html",
  styleUrls: ["./cart-modal.page.scss"],
})
export class CartModalPage implements OnInit {
  cart: Product[] = [];

  constructor(
    private cartService: CartService,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }

  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }

  removeCarItem(product) {
    this.cartService.removeProduct(product);
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }

  close() {
    this.modalCtrl.dismiss();
  }
  checkout() {
    this.cartService.uploadCartSession(this.cart);
    this.router.navigate(['/', 'checkout']);
  }
}
