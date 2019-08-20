import { Component, OnInit, Input } from '@angular/core';
import { Actuacion } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-actuacion-detail',
  templateUrl: './actuacion-detail.component.html',
  styleUrls: ['./actuacion-detail.component.scss'],
})
export class ActuacionDetailComponent implements OnInit {

  @Input() actuacion: Actuacion;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.actuacion);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
