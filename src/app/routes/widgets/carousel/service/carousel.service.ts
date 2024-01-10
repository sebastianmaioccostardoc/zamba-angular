import { Injectable } from '@angular/core';
import { HttpContext } from '@angular/common/http';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { environment } from '@env/environment';
import { _HttpClient } from '@delon/theme';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor(private http: _HttpClient) { }

  _getCarouselContent(genericRequest: any) {
    return this.http.post(`${environment['apiRestBasePath']}/getCarouselContent`, genericRequest, null, {
      context: new HttpContext().set(ALLOW_ANONYMOUS, true)
    })
  }

}
