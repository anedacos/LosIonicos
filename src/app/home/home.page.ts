import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { LoadingController, ModalController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { CartService } from "../services/cart.service";
import { CartModalPage } from "../pages/cart-modal/cart-modal.page";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  items: Array<any>;
  cart = [];
  products = [];
  cartItemCount: BehaviorSubject<number>;

  @ViewChild("cart", { static: false, read: ElementRef }) fab: ElementRef;

  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    // tslint:disable-next-line: no-shadowed-variable
    private CartService: CartService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    if (this.route && this.route.data) {
      this.getData();
    }
    this.products = this.CartService.getProducts();
    this.cart = this.CartService.getCart();
    this.cartItemCount = this.CartService.getCartItemCount();
  }

  addToCart(product) {
    this.animateCSS("tada");
    this.CartService.addProduct(product);
  }

  async openCart() {
    let modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: "cart-modal",
    });
    modal.present();
  }

  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add("animated", animationName);

    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove("animated", animationName);
      }
      node.removeEventListener("animationend", handleAnimationEnd);
    }
    node.addEventListener("animationend", handleAnimationEnd);
  }

  async getData() {
    const loading = await this.loadingCtrl.create({
      message: "Please wait...",
    });
    this.presentLoading(loading);

    this.route.data.subscribe((routeData) => {
      routeData["data"].subscribe((data) => {
        loading.dismiss();
        this.items = data;
      });
    });
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  logout() {
    this.authService.doLogout().then(
      (res) => {
        this.router.navigate(["/login"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
