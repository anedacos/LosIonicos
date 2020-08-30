import { Component, OnInit, ViewChild , } from '@angular/core';
//import { NavController, ToastController, NavParams } from "ionic-angular";
//import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { MenuController } from '@ionic/angular';
import{UsersPage} from '../Users/users.page'
import { Router, RouterEvent } from '@angular/router';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
  })

  export class DashboardPage{

    pages: {
      title: string;
      url: string;
    }[] = [
      {
        title: 'Usuarios',
        url: '/datausers', //link para productos
      },
      {
        title: 'Usuarios', 
        url: '/datausers',//link para pedidos
      },
      {
        title: 'Usuarios',
        url: '/datausers',// link para usuarios
      }
    ];
  
    selectedPath: string = '';
    constructor(private router: Router) {
      this.router.events.subscribe((event: RouterEvent) => {
        this.selectedPath = event.url;
      });
    }













    
  }