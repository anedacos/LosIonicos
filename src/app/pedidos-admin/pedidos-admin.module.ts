import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PedidosAdminPageRoutingModule } from './pedidos-admin-routing.module';

import { PedidosAdminPage } from './pedidos-admin.page';
import { PedidosAdminResolver } from './pedidos-admin.resolver';

const routes: Routes = [
  {
    path: '',
    component: PedidosAdminPage,
    resolve: {
      data: PedidosAdminResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PedidosAdminPage],
	providers: [
	PedidosAdminResolver
  ]
})
export class PedidosAdminPageModule {}
