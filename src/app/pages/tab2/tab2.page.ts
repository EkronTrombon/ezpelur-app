import { Component, OnInit } from '@angular/core';
import { Actuacion } from '../../interfaces/interfaces';
import { ActuacionService } from '../../services/actuacion.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { ActuacionDetailComponent } from '../../components/actuacion-detail/actuacion-detail.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  actuaciones: Actuacion[] = [];

  constructor(private actuacionService: ActuacionService,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController) {}

  ngOnInit() {
    this.cargaActuaciones();
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

  async actuacionDetail(act: Actuacion) {
    const modal = await this.modalCtrl.create({
      component: ActuacionDetailComponent,
      componentProps: { 'actuacion': act }
    });
    return await modal.present();
  }

}
