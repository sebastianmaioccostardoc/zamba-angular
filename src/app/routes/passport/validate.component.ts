import { HttpContext } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { MatchControl } from '@delon/util/form';
import { environment } from '@env/environment';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { catchError, finalize, throwError } from 'rxjs';

@Component({
  selector: 'passport-validate',
  templateUrl: './validate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidateComponent implements OnInit {
  showSuccessMessage = false;
  serverError = false;
  constructor(
    private router: Router,
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.route.queryParams.subscribe(params => {
        console.log('los parametros son', params);
        //convertir el objeto params en un array de objetos
        const genericRequest = {
          UserId: 0,
          Params: params
        };
        this.http
          .post(`${environment['apiRestBasePath']}/ActivateUser`, genericRequest, null, {
            observe: 'response',
            responseType: 'json',
            context: new HttpContext().set(ALLOW_ANONYMOUS, true)
          })
          .pipe(
            catchError(error => {
              console.error('Error en la solicitud:', error);
              this.serverError = true;
              return throwError(() => error);
            }),
            finalize(() => {
              this.cdr.detectChanges();
            })
          )
          .subscribe(response => {
            this.showSuccessMessage = true;
          });
      });
      this.cdr.detectChanges();
    }, 2000);
  }

  //funcion para tomar parametros de la url
}
