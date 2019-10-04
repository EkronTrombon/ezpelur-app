import { Component, OnInit } from '@angular/core';
import { Actuacion } from '../../interfaces/interfaces';
import { ActuacionService } from '../../services/actuacion.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { ActuacionDetailComponent } from '../../components/actuacion-detail/actuacion-detail.component';
import { ActuacionUpdateComponent } from '../../components/actuacion-update/actuacion-update.component';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  actuaciones: Actuacion[] = [];
  segSelected = 'lista';

  constructor(private actuacionService: ActuacionService,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              private uiService: UiService) {}

  ngOnInit() {
    this.cargaActuaciones();
    this.actuacionService.nuevaActuacion.subscribe(event => this.cargaActuaciones());
  }

  async cargaActuaciones() {
    // Añadimos un loading mientras carga el login
    const loading = await this.loadingCtrl.create({
      message: 'Cargando actuaciones...'
    });
    await loading.present();
    // Fin loading
    this.actuacionService.getActuaciones().subscribe((resp: any) => {
      this.actuaciones = resp.actuaciones;
      this.loadingCtrl.dismiss();
    });
  }

  async newActuacion() {
    const modal = await this.modalCtrl.create({
      component: ActuacionUpdateComponent
    });
    return await modal.present();
  }

  segmentChanged(event) {
    const seg = event.detail.value;
    this.segSelected = seg;
  }

}
