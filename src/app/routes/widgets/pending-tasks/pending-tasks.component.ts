import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { GridsterItem } from 'angular-gridster2';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PendingTasksService } from './service/pending-tasks.service';

import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

interface ItemData {
  gender: string;
  name: Name;
  email: string;
}

interface Name {
  title: string;
  first: string;
  last: string;
}


@Component({
  selector: 'pending-tasks',
  templateUrl: './pending-tasks.component.html',
  styleUrls: ['pending-tasks.component.css']
})
export class PendingTasksComponent implements OnInit, OnDestroy {
  @Input()
  widget: GridsterItem = {
    type: '',
    title: '',
    cols: 0,
    rows: 0,
    x: 0,
    y: 0,
    resizeEvent: new EventEmitter<GridsterItem>()
  };
  @Input()
  resizeEvent: EventEmitter<GridsterItem> = new EventEmitter<GridsterItem>();
  videoId: string = "";

  loading = false;
  data = [
    {
      title: 'Solicitud de vacaciones',
      description: 'Ir al formulario de solicitud de vacaciones y completar los campos requeridos'
    },
    {
      title: 'Completar datos personales',
      description: 'Ir al formulario de datos personales y completar los campos requeridos'
    },
    {
      title: 'Solicitud de dias por enfermedad',
      description: 'Ver instrucciones para solicitar dias por enfermedad'
    },
    {
      title: 'Solicitud de dias por maternidad',
      description: 'Ver instrucciones para solicitar dias por maternidad'
    }
  ];
  private destroy$ = new Subject<boolean>();
  constructor(public nzMessage: NzMessageService, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService, private router: Router, private pendingTasksService: PendingTasksService, private cdr: ChangeDetectorRef, private http: HttpClient) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  ngOnInit(): void {
    const tokenData = this.tokenService.get();
    if (tokenData != null && tokenData["userid"] != null) {
      var genericRequest = {
        UserId: tokenData["userid"],
        Params: ""
      };
    }

  }
}
