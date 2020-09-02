import { Component, OnInit } from '@angular/core';
import { Product } from '../services/cart.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  carrito: Product[] = [];
  productos: Product[] =[];
  total=5;
 
  validations_form: FormGroup;
  image: any;

  constructor(
    public router: Router,
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      nombres: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required)
    });
    this.obtenerCarrito();
  }


  obtenerCarrito(){
    this.carrito=JSON.parse(localStorage.getItem("carrito"));
    
    this.total= this.carrito.reduce((i, j) => i + j.price * j.amount, 0) ;

    console.log(this.total);
    return this.carrito
  }
  realizarCompra(value){
    //Debo obtener estos datos desde un form de ionic como en new task
    let data = {
      nombre: value.nombres,
      direccion: value.direccion,
      total: this.total ,
      estado:"Preparando",
      image:  "./assets/imgs/buy-cart.png"
    }
    this.firebaseService.completarRegistroPedido(data)
    .then(
      res => {
        this.router.navigate(["/pedidos"]);
      }
    )
  }
}
