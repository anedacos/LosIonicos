import { Component, OnInit, ViewChild , } from '@angular/core';
//import { NavController, ToastController, NavParams } from "ionic-angular";
//import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { MenuController } from '@ionic/angular';
import{UsersPage} from '../Users/users.page'
import { Router, RouterEvent } from '@angular/router';
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
  })

  export class DashboardPage{

    pages: {
      title: string;
      url: string;
      icon:string;
    }[] = [
      {
        title: 'Usuarios',
        icon  : "home",
        url: '/dashboard/dashboard/datausers', //link para productos
       
      },
      {
        title: 'Usuarios', 
        icon  : "home",
        url: '/datausers',//link para pedidos
        
      },
      {
        title: 'Usuarios',
        icon  : "home",
        url: '/datausers',// link para usuarios
      }
    ];
  
    selectedPath: string = '';
    constructor(private router: Router, private authService: AuthService,) {
      this.router.events.subscribe((event: RouterEvent) => {
        this.selectedPath = event.url;
      });
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