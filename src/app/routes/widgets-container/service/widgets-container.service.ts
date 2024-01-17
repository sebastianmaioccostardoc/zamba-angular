import { Injectable } from '@angular/core';
import { HttpContext } from '@angular/common/http';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { environment } from '@env/environment';
import { _HttpClient } from '@delon/theme';

@Injectable({
  providedIn: 'root'
})
export class WidgetsContainerService {

  constructor(private http: _HttpClient) { }

  _getWidgetsContainer(genericRequest: any) {
    return this.http.post(`${environment['apiRestBasePath']}/getWidgetsContainer`, genericRequest, null, {
      context: new HttpContext().set(ALLOW_ANONYMOUS, true)
    })
  }

  _setWidgetsContainer(genericRequest: any) {
    return this.http.post(`${environment['apiRestBasePath']}/setWidgetsContainer`, genericRequest, null, {
      context: new HttpContext().set(ALLOW_ANONYMOUS, true)
    })
  }
}
