
import { Component, OnInit, Inject, Input, EventEmitter, ChangeDetectorRef, ElementRef, Renderer2, QueryList, SimpleChanges } from '@angular/core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { CarouselService } from "./service/carousel.service";
import { GridsterItem, GridsterItemComponent } from 'angular-gridster2';
import { Subscription, catchError } from 'rxjs';


@Component({
  selector: 'app-carousel',
  styles: [],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less']
})
export class CarouselComponent implements OnInit {
  @Input() showImages: boolean = false;

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

  @Input()
  changeEvent: EventEmitter<GridsterItem> = new EventEmitter<GridsterItem>();

  @Input()
  gridItem: ElementRef | undefined;

  private resizeSubscription: Subscription | undefined;
  private changeSubscription: Subscription | undefined;
  config: any = [];
  listContent = new Array();
  images: boolean = true;


  dotPosition = 'top'; //posible options: buttom, rigth, left
  AutoPlaySpeed = 5000;
  AutoPlay = true;
  EnableSwipe = true;
  Loop = true;

  constructor(@Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService, private carouselService: CarouselService, private cdr: ChangeDetectorRef, private renderer: Renderer2) {
  }

  ChangeFlag() {
    this.showImages = !this.showImages;
  }

  ngOnInit(): void {
    if (this.widget != undefined) {
      console.log("Inicio el componente", this.widget["type"]);
    }

    this.getCarouselConfig();
    this.getCarouselContent();

    this.resizeSubscription = this.resizeEvent.subscribe((item: GridsterItem) => {

      if (this.widget["name"] == item["name"]) {
        this.showImages = false;
        this.cdr.detectChanges();

        this.showImages = true;
        this.cdr.detectChanges();
      }

    });

    this.changeSubscription = this.changeEvent.subscribe((item: GridsterItem) => {

    });

  }

  ngAfterViewInit() {
    console.log('console ngAfterViewInit');
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
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

      this.carouselService._getCarouselContent(genericRequest).pipe(
        catchError((error) => {
          // Manejo de errores
          this.images = false;
          this.cdr.detectChanges();
          console.error('Error al obtener datos:', error);
          throw error; // Puedes relanzar el error o retornar un valor por defecto
        })
      ).subscribe((data) => {
        this.images = true;
        this.cdr.detectChanges();
        this.listContent = JSON.parse(data);

        if (this.listContent.length == 0) {
          this.EnableSwipe = false;
        }

        this.cdr.detectChanges();
      },
        (error) => {
          this.images = false;
          this.cdr.detectChanges();
          console.error('Error al obtener datos:', error);
        });
    }
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
      this.carouselService._getCarouselConfig(genericRequest).pipe(
        catchError((error) => {
          // Manejo de errores
          this.images = false;
          this.cdr.detectChanges();
          console.error('Error al obtener datos:', error);
          throw error; // Puedes relanzar el error o retornar un valor por defecto
        })
      ).subscribe((data) => {
        this.images = true;
        this.cdr.detectChanges();
        var dataJson = JSON.parse(data);

        this.dotPosition = dataJson.DotPosition;
        this.AutoPlaySpeed = dataJson.AutoPlaySpeed;
        this.AutoPlay = dataJson.AutoPlay;
        this.EnableSwipe = dataJson.EnableSwipe;
        this.Loop = dataJson.Loop;
        this.cdr.detectChanges();
      },
        (error) => {
          this.images = false;
          this.cdr.detectChanges();
          console.error('Error al obtener datos:', error);
        });
    }
  }
}
