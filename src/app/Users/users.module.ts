import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UsersPage } from './users.page';

const routes: Routes = [
    {
      path: '',
      component: UsersPage
    }
  ];

  @NgModule({
    imports: [
      CommonModule,
    
      FormsModule,
      IonicModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes)
    ],
    declarations: [UsersPage]
  })
  export class UsersPageModule {}
