import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesCartModalPage } from './pages-cart-modal';

@NgModule({
  declarations: [
    PagesCartModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesCartModalPage),
  ],
})
export class PagesCartModalPageModule {}
