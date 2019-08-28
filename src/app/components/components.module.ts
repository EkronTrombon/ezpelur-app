import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { ActuacionDetailComponent } from './actuacion-detail/actuacion-detail.component';
import { ActuacionUpdateComponent } from './actuacion-update/actuacion-update.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    ActuacionDetailComponent,
    ActuacionUpdateComponent
  ],
  entryComponents: [
    ActuacionDetailComponent,
    ActuacionUpdateComponent
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class ComponentsModule { }
