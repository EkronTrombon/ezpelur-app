import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Actuacion, Usuario, NotificacionPush } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { ActuacionService } from '../../services/actuacion.service';
import { UiService } from '../../services/ui.service';
import { PushService } from '../../services/push.service';

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
  pushNoti = false;
  notificacionPush: NotificacionPush = {
    titulo: '',
    mensaje: ''
  };

  constructor(private modalCtrl: ModalController,
              private usarioService: UsuarioService,
              private actuacionService: ActuacionService,
              private uiService: UiService,
              private pushService: PushService) { }

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
    if (fAddAct.valid) {
      this.setNuevaActuacion(fAddAct.value);
      if (this.actuacion._id) {
        await this.udpateActuacion();
      } else {
        await this.createActuacion();
      }
    } else {
      this.uiService.toastInformativo('Se deben rellenar todos los datos de la actuación');
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
    if (this.pushNoti) {
      this.enviarPushNotification();
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

  enviaPush(event) {
    if (event.detail.checked) {
      this.pushNoti = true;
    } else {
      this.pushNoti = false;
    }
  }

  enviarPushNotification() {
    this.notificacionPush.titulo = `Nueva actuación añadida: ${this.actuacion.tipo}`;
    this.notificacionPush.mensaje = `Fecha: ${this.actuacion.fecha} - Lugar: ${this.actuacion.lugar}`;
    this.pushService.sendPushNotification(this.notificacionPush).subscribe(resp => {
      console.log(resp);
    });
  }

}
