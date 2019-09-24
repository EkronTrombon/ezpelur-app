import { Component, OnInit } from '@angular/core';
import { PartituraService } from '../../services/partitura.service';
import { Partitura } from '../../interfaces/interfaces';
import { LoadingController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  categorias = [{
    nombre: 'Arin-Arin',
    valor: 'arin'
  }, {
    nombre: 'Diana',
    valor: 'diana'
  }, {
    nombre: 'Fandango',
    valor: 'fandango'
  }, {
    nombre: 'Jota',
    valor: 'jota'
  }, {
    nombre: 'Mexicana',
    valor: 'mexicana'
  }, {
    nombre: 'Murga',
    valor: 'murga'
  }, {
    nombre: 'Pasacalles',
    valor: 'pasacalles'
  }, {
    nombre: 'Vals',
    valor: 'vals'
  }];
  partituras: Partitura[] = [];

  constructor(private partituraService: PartituraService,
              private loadingCtrl: LoadingController,
              private iab: InAppBrowser) {}

  ngOnInit() {}

  async segmentChanged(event) {
    const segmento = event.detail.value;
    this.partituras = [];
    // Añadimos un loading mientras cargan las partituras
    const loading = await this.loadingCtrl.create({
      message: 'Cargando partituras...'
    });
    await loading.present();
    // Fin loading
    this.partituraService.getPartituras().subscribe((resp: any) => {
      for (const p of resp.partituras) {
        if (p.categoria === segmento) {
          this.partituras.push(p);
        }
      }
      this.loadingCtrl.dismiss();
    });
  }

  descargaPartitura(url: string) {
    console.log(url);
    // Abrimos el URL en el navegador nativo del móvil.
    const browser = this.iab.create(url, '_system');
  }



}
