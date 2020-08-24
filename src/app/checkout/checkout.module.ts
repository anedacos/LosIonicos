import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CheckoutRoutingModule } from './checkout-routing.module';

import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {CheckoutComponent} from './checkout.component';
@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
   
  ]
})
export class CheckoutModule { }
