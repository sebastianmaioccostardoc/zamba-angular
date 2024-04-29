import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MessageListenerService {

  constructor(private router: Router) { }
  startListening() {
    window.addEventListener('message', event => {
      var url = new URL(environment['zambaWeb']);
      var origin = url.protocol + '//' + url.hostname + (url.port ? ':' + url.port : '');
      if (event.origin != origin) {
        return;
      }
      var message = JSON.parse(event.data);
      this.handleMessage(message);
    });
  }
  handleMessage(message: any) {
    try {
      switch (message.type) {
        case 'request vacation':
          console.log(message.data);
          break;
      }
    } catch (e) {
      console.error("Error al procesar el mensaje: ", e);
    }
  }

}
