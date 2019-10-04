import { Component, OnInit, Input } from '@angular/core';
import { Actuacion } from 'src/app/interfaces/interfaces';
import { ActuacionService } from 'src/app/services/actuacion.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { UiService } from 'src/app/services/ui.service';
import { ActuacionUpdateComponent } from '../actuacion-update/actuacion-update.component';
import { ActuacionDetailComponent } from '../actuacion-detail/actuacion-detail.component';

@Component({
  selector: 'app-lista-actuaciones',
  templateUrl: './lista-actuaciones.component.html',
  styleUrls: ['./lista-actuaciones.component.scss'],
})
export class ListaActuacionesComponent implements OnInit {

  @Input() actuaciones: Actuacion[];

  constructor(private actuacionService: ActuacionService,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              private uiService: UiService) {}

  ngOnInit() {}

  async actualizar(act) {
    const modal = await this.modalCtrl.create({
      component: ActuacionUpdateComponent,
      componentProps: { 'actuacion': act }
    });
    return await modal.present();
  }

  async borrar(act: Actuacion) {
    const borrada = await this.actuacionService.deleteActuacion(act._id);
    if (borrada) {
      this.uiService.toastInformativo('Actuación eliminada!');
    } else {
      this.uiService.toastInformativo('No se ha podido eliminar la actuación');
    }
  }

  async actuacionDetail(act: Actuacion) {
    const modal = await this.modalCtrl.create({
      component: ActuacionDetailComponent,
      componentProps: { 'actuacion': act }
    });
    return await modal.present();
  }

}
