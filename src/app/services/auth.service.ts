import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import { FirebaseService } from "./firebase.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: "root",
})
export class AuthService {

  constructor(
    private firebaseService: FirebaseService,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
  ) {}

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  Register(value, afs: AngularFirestore ){
    new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then( newUser=>{
        console.log('guardando data')
        console.log(newUser.user.uid);
        console.log(value);
        afs.collection('usuarios').doc(newUser.user.uid).set({
            nombre: value.nombre,
            apellido: value.apellido,
            cedula: value.cedula,
            telefono: value.telefono,
            rolAdmin:value.rolAdmin

        });

      }


        //Here if you want you can sign in the user
      ).catch(function(error) {
          //Handle error
          console.log(error);
      });
    })

    
   }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .signOut()
        .then(() => {
          this.firebaseService.unsubscribeOnLogOut();
          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject();
        });
    });
  }


  getUserInfo(){
    //firebase.auth().currentUser.uid
   this.afs.collection('usuarios').doc(firebase.auth().currentUser.uid).valueChanges().subscribe((data: any[]) => 
    
    
    { 
         return data;
    }
    
    
    ); 
    
  }
}
