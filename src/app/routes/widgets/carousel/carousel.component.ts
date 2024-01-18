
import { Component, OnInit, Inject, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { CarouselService } from "./service/carousel.service";
import { GridsterItem, GridsterItemComponent } from 'angular-gridster2';
import { RTLService } from '@delon/theme';


@Component({
  selector: 'app-carousel',
  styles: [],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less']
})
export class CarouselComponent implements OnInit {

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

  config: any = [];
  listContent = new Array();
  images: boolean = true;


  dotPosition = 'top'; //posible options: buttom, rigth, left
  AutoPlaySpeed = 5000;
  AutoPlay = true;
  EnableSwipe = true;
  Loop = true;

  style = "max-height: 100%;"

  constructor(@Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService, private carouselService: CarouselService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    console.log("Inicio el componente", this.widget["type"]);
    this.getCarouselConfig();
    this.getCarouselContent();

  }
  getCarouselContent() {
    this.EnableSwipe = true;
    const tokenData = this.tokenService.get();
    let genericRequest = {}

    if (tokenData != null) {
      console.log("Imprimo los valores en tokenService en el service", tokenData);

      genericRequest = {
        UserId: tokenData["userid"],
        Params: ""
      };

      this.carouselService._getCarouselContent(genericRequest).subscribe((data) => {
        this.listContent = JSON.parse(data);

        if (this.listContent.length == 0)
          this.EnableSwipe = false;

        if (this.widget.cols > this.widget.rows)
          this.style = "max-width: 100%;"
        else
          this.style = "max-height: 100%;"

        this.cdr.detectChanges();
      });
    }
  }
  changeDotPosition(pos: string) {
    this.dotPosition = pos;
  }
  getCarouselConfig() {

    const tokenData = this.tokenService.get();
    let genericRequest = {}

    if (tokenData != null) {
      console.log("Imprimo los valores en tokenService en el service", tokenData);

      genericRequest = {
        UserId: tokenData["userid"],
        Params: ""
      };
      this.carouselService._getCarouselConfig(genericRequest).subscribe((data) => {
        var dataJson = JSON.parse(data);

        this.dotPosition = dataJson.DotPosition;
        this.AutoPlaySpeed = dataJson.AutoPlaySpeed;
        this.AutoPlay = dataJson.AutoPlay;
        this.EnableSwipe = dataJson.EnableSwipe;
        this.Loop = dataJson.Loop;
        this.cdr.detectChanges();

      });
    }
  }

  onResizeEvent(item: any) {


  }

}
