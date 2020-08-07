import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesProductosPage } from './pages-productos';

@NgModule({
  declarations: [
    PagesProductosPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesProductosPage),
  ],
})
export class PagesProductosPageModule {}
