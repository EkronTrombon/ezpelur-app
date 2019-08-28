import { Component, OnInit, Input } from '@angular/core';
import { Actuacion, Usuario } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-actuacion-detail',
  templateUrl: './actuacion-detail.component.html',
  styleUrls: ['./actuacion-detail.component.scss'],
})
export class ActuacionDetailComponent implements OnInit {

  @Input() actuacion: Actuacion;
  listaMusicos: Usuario[] = [];

  constructor(private modalCtrl: ModalController, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getListaMusicos(this.actuacion.musicos);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async getListaMusicos(musicos: string[]) {
    for (const musico of musicos) {
      await this.getMusico(musico);
    }
  }

  getMusico(id: string) {
    return new Promise(resolve => {
      this.usuarioService.getUsuario(id).subscribe((resp: any) => {
        if (resp.ok) {
          this.listaMusicos.push(resp.usuario);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

}
