import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { ActuacionDetailComponent } from './actuacion-detail/actuacion-detail.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ActuacionDetailComponent
  ],
  entryComponents: [
    ActuacionDetailComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class ComponentsModule { }
