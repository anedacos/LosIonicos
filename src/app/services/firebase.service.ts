import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  private snapshotChangesSubscription: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { }

  getTasks() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          //this.snapshotChangesSubscription = this.afs.collection('people').doc(currentUser.uid).collection('tasks').snapshotChanges();
          this.snapshotChangesSubscription = this.afs.collection('productos').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }

  getTask(taskId) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs.doc<any>('people/' + currentUser.uid + '/tasks/' + taskId).valueChanges()
            .subscribe(snapshots => {
              resolve(snapshots);
            }, err => {
              reject(err)
            })
        }
      })
    });
  }

  unsubscribeOnLogOut() {
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }

  updateTask(taskKey, value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('tasks').doc(taskKey).set(value)
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  deleteTask(taskKey) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('tasks').doc(taskKey).delete()
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  createTask(value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('productos').add({
        //this.afs.collection('people').doc(currentUser.uid).collection('tasks').add({
        nombre: value.nombre,
        descripcion: value.descripcion,
        precio: value.precio,
        stock: value.stock,
        categoria: value.categoria,
        image: value.image
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI, randomId) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(randomId);
      this.encodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            snapshot.ref.getDownloadURL()
              .then(res => resolve(res))
          }, err => {
            reject(err);
          })
      })
    })
  }

  //CRUD Pedido
  createPedido(value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('pedidos').add({
        image: value.image,
        nombre: value.nombre,
        direccion: value.direccion,
        total: value.total,
        estado: value.estado
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  getPedidos() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs.collection('people').doc(currentUser.uid).collection('pedidos').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }
  getAllPedidos(){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afs.collection('people').doc(currentUser.uid).collection('pedidos').snapshotChanges();//Debo hacer esto para cada usuario
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }

  getPedido(pedidoId) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs.doc<any>('people/' + currentUser.uid + '/pedidos/' + pedidoId).valueChanges()
            .subscribe(snapshots => {
              resolve(snapshots);
            }, err => {
              reject(err)
            })
        }
      })
    });
  }

  updatePedido(pedidoKey, value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('pedidos').doc(pedidoKey).set(value)
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }


  deletePedido(pedidoKey) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('pedidos').doc(pedidoKey).delete()
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }


  //funciones de usuario
  getUsersData() {

    this.itemsCollection = this.afs.collection('usuarios');
    this.items = this.itemsCollection.valueChanges({ idField: 'id' });
    //  this.items.forEach( item =>{
    // console.log(item)
    // });

    return this.items;
  }

  inactivarUsuario(userkey) {
    console.log(this.afs.collection('usuarios').doc(userkey))

  }

  editUsuario(value, uid) {
    this.afs.collection("usuarios").doc(uid).update({
      nombre: value.nombre,
      apellido: value.apellido,
      cedula: value.cedula,
      telefono: value.telefono,
      rolAdmin: value.rolAdmin
    });

  }

  quitarAdmin(uid) {
    console.log('quitando admin')
    this.afs.collection("usuarios").doc(uid).update({

      rolAdmin: false
    });

  }
  getInfoUser() {

    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs.doc<any>('usuarios/' + currentUser.uid).valueChanges()
            .subscribe(snapshots => {
              resolve(snapshots);
            }, err => {
              reject(err)
            })
        }
      })
    });
  }



}
