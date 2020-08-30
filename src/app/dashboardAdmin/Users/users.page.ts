import { Component, OnInit, ViewChild , } from '@angular/core';

import { Router } from '@angular/router';

import {  AlertController } from '@ionic/angular';
import { FirebaseService} from '../../services/firebase.service';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
    selector: 'app-users',
    templateUrl: './users.page.html',
    styleUrls: ['./users.page.scss'],
  })

  export class UsersPage  {
    public columns: any;
    errorMessage: string = '';
    successMessage: string = '';
    items: Observable<any[]>;
    user: any;
    temp=[];
    data:any;
    usuarioadmin=[];
    i:any;
    d:any;
   // public rows: any;
    public rows: {name:string, apellido:string,cedula:string, telefono: string, rolAdmin: boolean, id: string}[] = [];
 
   tablestyle= "bootstrap";
  
   constructor( private alertCtrl: AlertController,private firebaseService: FirebaseService,  private authService: AuthService, public afs: AngularFirestore){
    this.columns= [
        {name: "Nombre"},
        {name: "Apellido"},
        {name: "Cedula"}
    ];
    console.log(this.rows);
    this.temp=this.getAllUsers();
   

   }
   

   getAllUsers(){
    //console.log(this.firebaseService.getUsersData());
  this.items= this.firebaseService.getUsersData();
  
   // console.log(this.rows);
    this.items.forEach( item =>{
     item.forEach( i =>{
       if(i.rolAdmin){
       this.rows.push({
        "name":i.nombre,
        "apellido":i.apellido,
        "cedula": i.cedula,
        "telefono": i.telefono,
        "rolAdmin":i.rolAdmin,
        "id": i.id
       },
       )}
       // console.log(i.nombre)
     });
      
  });
  
  //console.log(this.rows);

  return this.rows;
}





   async delete(row,id){
    let alert=  this.alertCtrl.create({
        header: 'Eliminar usuario',
        message: 'Seguro de inactivar al usuario ?',
        buttons:   [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Eliminar',
            
            handler: (alertData) => { //takes the data 
              this.firebaseService.quitarAdmin( this.rows[id].id);
          }
      }] 
        
      
    }
    
    );
    (await alert).present();

   }





   async edit(row,id){
    
    let alert=  this.alertCtrl.create({
        header: 'Editar usuario',
        message: 'Ingrese los datos a editar',
        inputs: [
            {
              name: 'nombre',
              placeholder: 'Nombre',//se debe colocar el nombre de la bd
              value: this.rows[id].name 
            },

            {
                name: 'apellido',
                placeholder: 'Apellido',
                value: this.rows[id].apellido//agregar apellido del user
              },
              {
                name: 'cedula',
                placeholder: 'cedula',//agregar apellido del user
                value:this.rows[id].cedula
              },
              {
                name: 'telefono',
                placeholder: 'teléfono',//agregar apellido del user
                value: this.rows[id].telefono
              },

              {
                name: 'Correo',
                placeholder: 'Correo' //se debe colocar el correo tomado de la bd
              },
        ],
        buttons:   [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Actualizar',
            handler: (alertData) => { //takes the data 
              this.usuarioadmin=alertData;
              this.usuarioadmin['rolAdmin']=true;
              
              this.editarUser(this.usuarioadmin,this.rows[id].id);
              console.log(this.usuarioadmin, this.rows[id].id);
          }
      }]  
    });
    (await alert).present();
    //console.log(id);
   }


   async create(){
    
    let alert=  this.alertCtrl.create({
        header: 'Crear usuario',
        message: 'Ingrese los datos a editar',
        inputs: [
            {
              name: 'nombre',
              placeholder: 'Ingrese Nombre' //se debe colocar el nombre de la bd
            },

            {
                name: 'apellido',
                placeholder: 'Ingrese apellido '//agregar apellido del user
              },
              {
                name: 'email',
                placeholder: 'Correo' //se debe colocar el correo tomado de la bd
              },
              {
                name: 'password',
                type: 'password',
                placeholder: '' //se debe colocar el correo tomado de la bd
              },
              {
                name: 'cedula',
                placeholder: 'Cedula' //se debe colocar el correo tomado de la bd
              },
              {
                name: 'telefono',
                placeholder: 'telefono' //se debe colocar el correo tomado de la bd
              }

        ],
        buttons:   [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Crear',
          handler: (alertData) => { //takes the data 
            this.usuarioadmin=alertData;
            this.usuarioadmin['rolAdmin']=true;
            this.registerAdmin(this.usuarioadmin);
            console.log(this.usuarioadmin);
        }
    }]});
    (await alert).present();
    //console.log(id);
   }

registerAdmin(value){
 console.log(this.authService.Register(value,this.afs));


}


editarUser(user,id){
this.firebaseService.editUsuario(user,id);
/*var component = this.navController.getActive().instance;
//re-run the view load function if the page has one declared
if (component.ionViewDidLoad) {
    component.ionViewDidLoad();
}*/

}

  }