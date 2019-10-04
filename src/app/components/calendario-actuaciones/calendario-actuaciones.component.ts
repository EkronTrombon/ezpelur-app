import { Component, OnInit, Input } from '@angular/core';
import { Actuacion } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { ActuacionDetailComponent } from '../actuacion-detail/actuacion-detail.component';

@Component({
  selector: 'app-calendario-actuaciones',
  templateUrl: './calendario-actuaciones.component.html',
  styleUrls: ['./calendario-actuaciones.component.scss'],
})
export class CalendarioActuacionesComponent implements OnInit {

  @Input() actuaciones: Actuacion[];
  eventSource = [];
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  calendarTitle = '';

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.eventSource = this.loadEvents();
  }

  loadEvents() {
    const events = [];
    for (const act of this.actuaciones) {
      const title = act.tipo;
      const startTime = new Date(act.fecha);
      const endTime = new Date(act.fecha);
      const allDay = false;
      events.push({
        title: title,
        startTime: startTime,
        endTime: endTime,
        allDay: allDay,
        actuacion: act
      });
    }
    return events;
  }

  onViewTitleChanged(event) {
    this.calendarTitle = event;
  }

  onEventSelected(event) {
    this.actuacionDetail(event.actuacion);
  }

  async actuacionDetail(act: Actuacion) {
    const modal = await this.modalCtrl.create({
      component: ActuacionDetailComponent,
      componentProps: { 'actuacion': act }
    });
    return await modal.present();
  }

  onCurrentDateChanged(event) {
    // console.log('onCurrentDateChanged: ', event);
  }

  onTimeSelected(event) {
    // console.log('onTimeSelected: ', event);
  }

}
