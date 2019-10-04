import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { ActuacionDetailComponent } from './actuacion-detail/actuacion-detail.component';
import { ActuacionUpdateComponent } from './actuacion-update/actuacion-update.component';
import { FormsModule } from '@angular/forms';
import { ListaActuacionesComponent } from './lista-actuaciones/lista-actuaciones.component';
import { CalendarioActuacionesComponent } from './calendario-actuaciones/calendario-actuaciones.component';
import { NgCalendarModule  } from 'ionic2-calendar';
import { MusicoDetailComponent } from './musico-detail/musico-detail.component';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    HeaderComponent,
    ActuacionDetailComponent,
    ActuacionUpdateComponent,
    ListaActuacionesComponent,
    CalendarioActuacionesComponent,
    MusicoDetailComponent
  ],
  entryComponents: [
    ActuacionDetailComponent,
    ActuacionUpdateComponent,
    MusicoDetailComponent
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    PipesModule,
    NgCalendarModule
  ],
  exports: [
    HeaderComponent,
    ListaActuacionesComponent,
    CalendarioActuacionesComponent,
    MusicoDetailComponent
  ]
})
export class ComponentsModule { }
