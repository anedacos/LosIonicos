import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FirebaseService} from '../services/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
   'email': [
     { type: 'required', message: 'Email es requerido.' },
     { type: 'pattern', message: 'Ingrese un email correcto.' }
   ],
   'password': [
     { type: 'required', message: 'Password es requerido.' },
     { type: 'minlength', message: 'Password Debe tener al menos 5 caracteres.' }
   ],
   'nombre': [
    { type: 'required', message: 'Nombre es requrido.' },
  ],
    'apellido': [
    { type: 'required', message: 'Apellido es requerido.' },
  ],
  'telefono': [
    { type: 'required', message: 'Telefono es requerido.' },
  ],
  'cedula': [
    { type: 'required', message: 'cedula es requerido.' },
    { type: 'minlength', message: 'cedula debe ser mínima de 10 carácteres' },
    { type: 'pattern', message: 'Solo numeros' },
    { type: 'maxlength', message: 'maximo 10 caracteres' },
  ],

  };

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private firebaseService: FirebaseService,
    public afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      nombre: new FormControl('', Validators.compose([
        Validators.required,
        
      ])),
      apellido: new FormControl('', Validators.compose([
        Validators.required,
        
      ])),

      telefono: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]*'),
        
      ])),
      cedula: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ])),

    });
  }

  tryRegister(value){
    value['rolAdmin']=false;
   this.authService.Register(value,this.afs);
    
  }

  goLoginPage(){
    this.router.navigate(["/login"]);
  }

}
