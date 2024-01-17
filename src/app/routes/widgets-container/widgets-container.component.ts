import { ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { WidgetsContainerService } from "./service/widgets-container.service";
import { WidgetsContainerOptions } from "./entities/WidgetsContainerOptions";

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
  constructor(public msg: NzMessageService, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService, private router: Router, private WCService: WidgetsContainerService, private cdr: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    const tokenData = this.tokenService.get();
    if (tokenData != null)
      console.log("Imprimo los valores en tokenService", tokenData);

    console.log('Routes: ', this.router.config);

    this.getWidgetsContainer();

    this.options = {
      itemChangeCallback: WidgetsContainerComponent.itemChange,
      itemResizeCallback: item => {
        // update DB with new size
        // send the update to widgets
        this.resizeEvent.emit(item);
      }
    };

    this.dashboard = [
      { cols: 1, rows: 1, y: 0, x: 0, type: 'carousel' },
      { cols: 1, rows: 1, y: 1, x: 1, type: 'carousel' }
    ];

    this.setWidgetsContainer();
  }


  getWidgetsContainer() {
    const tokenData = this.tokenService.get();
    let genericRequest = {}

    if (tokenData != null) {
      console.log("Imprimo los valores en tokenService en el service", tokenData);

      genericRequest = {
        UserId: tokenData["userid"],
        Params: ""
      };

      this.WCService._getWidgetsContainer(genericRequest).subscribe((data) => {

        var dataJson = JSON.parse(data)[0];
        var optionsJson = JSON.parse(dataJson.Options);

        this.options.displayGrid = optionsJson.displayGrid;
        this.options.draggable = optionsJson.draggable;
        this.options.resizable = optionsJson.resizable;
        this.options.minCols = optionsJson.minCols;
        this.options.minRows = optionsJson.minRows;

        var WidgetsWidgetCoordinatesJson = JSON.parse(dataJson.WidgetCoordinates);

        this.dashboard = WidgetsWidgetCoordinatesJson;

        var api: any | null = this.options.api;

        if (api != undefined) {
          api.optionsChanged();
        }

      });

    }
  }


  setWidgetsContainer() {
    const tokenData = this.tokenService.get();
    let genericRequest = {};

    if (tokenData != null) {
      console.log("Imprimo los valores en tokenService en el service", tokenData);

      let WCOptions: WidgetsContainerOptions = new WidgetsContainerOptions(this.options.displayGrid, this.options.draggable, this.options.resizable, this.options.minCols, this.options.minRows);

      genericRequest = {
        UserId: tokenData["userid"],
        Params: {
          options: JSON.stringify(WCOptions),
          widgetsContainer: JSON.stringify(this.dashboard)
        }
      };

      this.WCService._setWidgetsContainer(genericRequest).subscribe((data) => {

        this.options = JSON.parse(data.Options);
        this.dashboard = JSON.parse(data.WidgetsContainer);

      });

    }
  }


  static itemChange(item: any, itemComponent: any) {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item: any, itemComponent: any) {
    console.info('itemResized', item, itemComponent);
  }


  // changedOptions() {
  //   this.options.api.optionsChanged();
  // }


  removeItem(item: any) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  /*
  addItem() {
    this.dashboard.push({});
  }
  */
}
