import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Actuacion, Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { ActuacionService } from '../../services/actuacion.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-actuacion-update',
  templateUrl: './actuacion-update.component.html',
  styleUrls: ['./actuacion-update.component.scss'],
})
export class ActuacionUpdateComponent implements OnInit {

  @Input() actuacion: Actuacion;
  textoBoton: string = '';
  anioActual = new Date().getFullYear();
  listaMusicos: Usuario[] = [];
  nuevaActuacion: Actuacion = {
    fecha: new Date(),
    lugar: '',
    tipo: '',
    contratacion: '',
    notas: '',
    musicos: [],
    realizada: false
  };
  tiposAct = ['Gigantes', 'Fanfarre', 'Dianas', 'Concierto', 'Villancicos', 'Otro'];
  listaMusicosSeleccionados: string[] = [];

  constructor(private modalCtrl: ModalController,
              private usarioService: UsuarioService,
              private actuacionService: ActuacionService,
              private uiService: UiService) { }

  async ngOnInit() {
    this.selTipoActuacion();
    await this.getMusicos();
    this.musicosSel();
  }

  musicosSel() {
    for (const musico of this.listaMusicos) {
      if (this.actuacion.musicos.indexOf(musico._id) >= 0) {
        musico.sel = true;
      } else {
        musico.sel = false;
      }
    }
  }

  selTipoActuacion() {
    if (this.actuacion) {
      this.textoBoton = 'Actualizar';
    } else {
      this.actuacion = this.nuevaActuacion;
      this.textoBoton = 'Guardar';
    }
  }

  getMusicos() {
    return new Promise(resolve => {
      this.usarioService.getUsuarios().subscribe((resp: any) => {
        if (resp) {
          this.listaMusicos = resp.usuarios;
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  cambiarSel(musico: Usuario) {
    musico.sel = !musico.sel;
  }

  async saveAct(fAddAct) {
    this.setNuevaActuacion(fAddAct.value);
    if (this.actuacion._id) {
      console.log('Actualizando!');
      await this.udpateActuacion();
    } else {
      console.log('Creando nueva act!');
      await this.createActuacion();
    }
  }

  async createActuacion() {
    const creada = await this.actuacionService.createActuacion(this.actuacion);
    if (creada) {
      this.uiService.toastInformativo('Actuación creada!');
      this.modalCtrl.dismiss();
    } else {
      this.uiService.toastInformativo('La actuación no se ha podido crear');
    }
  }

  async udpateActuacion() {
    const actualizada = await this.actuacionService.updateActuacion(this.actuacion._id, this.nuevaActuacion);
    if (actualizada) {
      this.uiService.toastInformativo('Actuación actualizada!');
      this.modalCtrl.dismiss();
    } else {
      this.uiService.toastInformativo('La actuación no se ha podido actualizar');
    }
  }

  setNuevaActuacion(valores: any) {
    for (const musico of this.listaMusicos) {
      if (musico.sel) {
        this.listaMusicosSeleccionados.push(musico._id);
      }
    }
    this.nuevaActuacion.fecha = valores.fecha;
    this.nuevaActuacion.lugar = valores.lugar;
    this.nuevaActuacion.contratacion = valores.contratacion;
    this.nuevaActuacion.tipo = valores.tipo;
    this.nuevaActuacion.notas = valores.notas;
    this.nuevaActuacion.musicos = this.listaMusicosSeleccionados;
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
