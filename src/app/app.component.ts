import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { FirebaseService } from "./services/firebase.service";

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rolAdmin: boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public afAuth: AngularFireAuth,
    private afs: FirebaseService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.afAuth.user.subscribe(user => {
        if(user){

          this.afs.getInfoUser().then(
            (val) => { 
              
              this.rolAdmin=val.rolAdmin;
              if(this.rolAdmin){

                console.log('es admin va al dashboard');
                this.router.navigate(["/dashboard"])
                
              }
              else{
    
                console.log('es cliente')
                console.log(this.rolAdmin);
                this.router.navigate(["/home"])
               
              };
             // console.log(this.rolAdmin)
              //this.activeUserData = val; }
            }
          );
         

         /* if(this.rolAdmin){
            console.log('es admin va al dashboard');
            this.router.navigate(["/dashboard"])
            
          }
          else{

            console.log('es cliente')
          
            this.router.navigate(["/home"])
           
          };
*/
          //this.router.navigate(["/home"]);
          
        } else {
          this.router.navigate(["/login"]);
        }
      }, err => {
        this.router.navigate(["/login"]);
      }, () => {
        this.splashScreen.hide();
      })
      this.statusBar.styleDefault();
    });
  }
}
