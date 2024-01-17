import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';

@Component({
  selector: 'widgets-container',
  templateUrl: './widgets-container.component.html',
  styleUrls: ['widgets-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetsContainerComponent implements OnInit {

  options: GridsterConfig = {};
  dashboard: Array<GridsterItem> = [
    { cols: 0, rows: 0, y: 0, x: 0 },
    { cols: 0, rows: 0, y: 0, x: 0 }
  ];
  resizeEvent: EventEmitter<GridsterItem> = new EventEmitter<GridsterItem>();
  constructor(public msg: NzMessageService, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService, private router: Router) {

  }
  ngOnInit(): void {
    const tokenData = this.tokenService.get();
    if (tokenData != null)
      console.log("Imprimo los valores en tokenService", tokenData);

    console.log('Routes: ', this.router.config);

    this.options = {
      itemChangeCallback: WidgetsContainerComponent.itemChange,
      itemResizeCallback: item => {
        // update DB with new size
        // send the update to widgets
        this.resizeEvent.emit(item);
      },
      //probando configuraciones
      displayGrid: 'none',
      draggable: {
        enabled: true
      },
      resizable: {
        enabled: true
      },
      minCols: 6,
      minRows: 6,
    };

    this.dashboard = [
      { cols: 1, rows: 1, y: 0, x: 0, type: 'carousel' },
      { cols: 1, rows: 1, y: 1, x: 1, type: 'carousel' }
    ];

  }



  static itemChange(item: any, itemComponent: any) {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item: any, itemComponent: any) {
    console.info('itemResized', item, itemComponent);
  }

  /*
    changedOptions() {
      this.options.api.optionsChanged();
    }
  */

  removeItem(item: any) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  /*
  addItem() {
    this.dashboard.push({});
  }
  */
}
