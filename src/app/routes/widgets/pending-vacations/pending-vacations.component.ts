import { Component, Inject, OnInit } from '@angular/core';
import { PendingVacationsService } from "./service/pending-vacations.service";
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { catchError } from 'rxjs';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-pending-vacations',
  templateUrl: './pending-vacations.component.html',
  styleUrls: ['./pending-vacations.component.less']
})
export class PendingVacationsComponent implements OnInit {
  emi = new Array();


  constructor(@Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService, private PVService: PendingVacationsService) { }

  ngOnInit(): void {
    this.GetExternalsearchInfo();
    this.GetVacation();
  }

  private GetVacation() {
    const tokenData = this.tokenService.get();
    let genericRequest = {};

    if (tokenData != null) {
      genericRequest = {
        UserId: tokenData['userid'],
        Params: ''
      };

      this.PVService._GetVacation(genericRequest).pipe(
        catchError(error => {
          console.error('Error al obtener datos:', error);
          throw error; // Puedes relanzar el error o retornar un valor por defecto
        })
      )
        .subscribe(data => {
          debugger;
          this.emi = JSON.parse(data);

          if (this.emi != null) {
          }
        });
    }
  }

  GetExternalsearchInfo() {
    const tokenData = this.tokenService.get();
    let genericRequest = {};

    interface KeyValue {
      [key: string]: any;
    }

    if (tokenData != null) {
      genericRequest = {
        UserId: tokenData['userid'],
        Params: {
          EntityID: '',
          query: '',
          ArrayInt: ''
        }
      };

      this.PVService._GetExternalsearchInfo(genericRequest).pipe(
        catchError(error => {
          console.error('Error al obtener datos:', error);
          throw error; // Puedes relanzar el error o retornar un valor por defecto
        })
      )
        .subscribe(data => {
          debugger;
          this.emi = JSON.parse(data);

          if (this.emi != null) {

          }
        });


    }
  }
}
