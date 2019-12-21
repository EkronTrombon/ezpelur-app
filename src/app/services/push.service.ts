import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { NotificacionPush } from '../interfaces/interfaces';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private http: HttpClient, private oneSignal: OneSignal) {}

  config() {
    this.oneSignal.startInit('22838bb2-8651-459b-8b96-8f5047b8c934', '83813392390');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
      // do something when notification is received
      console.log('Notificación recibida', noti);
    });
    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      // do something when a notification is opened
      console.log('Notificación abierta', noti);
    });
    this.oneSignal.endInit();
  }

  sendPushNotification(noti: NotificacionPush) {
    return this.http.post(`${URL}/push`, noti);
  }
}
