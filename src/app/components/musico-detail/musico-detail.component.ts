import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-musico-detail',
  templateUrl: './musico-detail.component.html',
  styleUrls: ['./musico-detail.component.scss'],
})
export class MusicoDetailComponent implements OnInit {

  @Input() musico: Usuario;
  tipo = 'usuarios';

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.musico);
  }

  callMusico() {
    console.log('Llamando a:', this.musico.nombre);
  }

  emailMusico() {
    console.log('Email a:', this.musico.nombre);
  }

  closeMusico() {
    this.modalCtrl.dismiss();
  }

}
