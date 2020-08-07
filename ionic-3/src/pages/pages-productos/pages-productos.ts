import { Product } from "./../../providers/services-cart/services-cart";
import { Component, OnInit } from "@angular/core";

import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
} from "ionic-angular";
import { BehaviorSubject } from "rxjs";
import { CartService } from "../../providers/services-cart/services-cart";

/**
 * Generated class for the PagesProductosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-pages-productos",
  templateUrl: "pages-productos.html",
})
export class PagesProductosPage implements OnInit {
  cart = [];
  products = [];
  cartItemCount: BehaviorSubject<number>;

  constructor(
    private CartService: CartService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.products = this.CartService.getProducts();
    this.cart = this.CartService.getCart();
    this.cartItemCount = this.CartService.getCartItemCount();
  }

  addToCart() {}

  openCart() {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad PagesProductosPage");
  }
}
