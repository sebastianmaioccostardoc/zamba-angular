import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { Subscription, zip, filter } from 'rxjs';

import { employeeUser } from './entitie/employeeUser';

@Component({
  selector: 'app-account-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProAccountCenterComponent implements OnInit {
  user: employeeUser = {
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png', // Employee Photo

    name: 'Name',
    lastName: 'LastName',
    email: 'Email@Mail.Ail',
    phone: '1100002222',
    birthday: 'Birthday',

    password: 'Password',


    employmentStatus: 'Employment Status',
    area: 'Area',
    department: 'Department',
    position: 'Position',

    workMode: 'Work Mode',

    /* 
      Si trabajo con metodología Presencial: mi Ubicación Laboral.
      Si trabajo Hibrido: La Ubicación Laboral y los días que me encuentro ahí.
      Si trabajo Remoto: Desde que País, Ciudad, Estado cual es la diferencia horaria  y cual es el horario de trabajo
    */

    workLocation: 'Work Location',
    country: 'Country',
    city: 'City',
    state: 'State',
    timeDifference: 'Time Difference',
    workSchedule: 'Work Schedule',

  };

  constructor(
    private router: Router,
    private http: _HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.http.get('/account/dashboard/getEmployeeUser').subscribe((res: any) => {
      this.user = res;

      this.cdr.detectChanges();
    });

  }

}
