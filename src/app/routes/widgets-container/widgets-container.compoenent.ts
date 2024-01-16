import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
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
    { cols: 2, rows: 1, y: 0, x: 0 },
    { cols: 2, rows: 2, y: 0, x: 2 }
  ];
  constructor(public msg: NzMessageService, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService, private router: Router) {

  }
  ngOnInit(): void {
    const tokenData = this.tokenService.get();
    if (tokenData != null)
      console.log("Imprimo los valores en tokenService", tokenData);

    console.log('Routes: ', this.router.config);

    this.options = {
      itemChangeCallback: WidgetsContainerComponent.itemChange,
      itemResizeCallback: WidgetsContainerComponent.itemResize,
    };

    this.dashboard = [
      { cols: 2, rows: 1, y: 0, x: 0 },
      { cols: 2, rows: 2, y: 0, x: 2 }
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
