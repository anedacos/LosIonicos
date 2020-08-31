import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPage,
    children:[
      {path: 'datausers', 
      loadChildren: '../Users/users.module#UsersPageModule'},
      {path: 'products', 
      loadChildren: '../new-task/new-task.module#NewTaskPageModule'},
    
    ],
  },
  {
    path: '',
    redirectTo: 'dashboard/datausers'
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
    declarations: [DashboardPage]
  })
  export class DashboardPageModule {}